"use client";

import React, { Suspense, useEffect } from "react";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { Vector } from "three/examples/jsm/physics/RapierPhysics.js";

import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Html, Text } from "@react-three/drei";
import { Loading } from "./loading/loading_full";
extend({ MeshLineGeometry, MeshLineMaterial });

function Loader() {
  return (
    <Html
      center
      className="w-dvw h-dvh flex flex-col justify-center items-center"
    >
      <Loading isShow={true} />
    </Html>
  );
}
export default function InteractiveBadge() {
  return (
    <Canvas className="touch-none" camera={{ position: [0, 0, 13], fov: 25 }}>
      <Suspense fallback={<Loader />}>
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Text
          maxWidth={2}
          lineHeight={1.2}
          letterSpacing={0.05}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="white"
          strokeColor="black"
          strokeWidth={0.01}
          position={[0, 0, 0]}
          fontSize={0.5}
          font="/fonts/Simpsonfont.ttf"
        >
          Please visit website on desktop for more
        </Text>
      </Suspense>
    </Canvas>
  );
}

function Band() {
  const band = useRef<THREE.Mesh<MeshLineGeometry>>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const texture = useLoader(TextureLoader, "/images/Card.png");
  const strapTexture = useLoader(TextureLoader, "/images/Strap.png");

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<Vector | null>(null);

  useRopeJoint(
    fixed as React.RefObject<RapierRigidBody>,
    j1 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1],
  );
  useRopeJoint(
    j1! as React.RefObject<RapierRigidBody>,
    j2 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1],
  );
  useRopeJoint(
    j2 as React.RefObject<RapierRigidBody>,
    j3 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1],
  );
  useSphericalJoint(
    j3 as React.RefObject<RapierRigidBody>,
    card as React.RefObject<RapierRigidBody>,
    [
      [0, 0, 0],
      [0, 1, 0],
    ],
  );
  useFrame((state, delta) => {
    void delta;
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      fixed.current &&
      band.current &&
      card.current
    ) {
      // Calculate catmul curve
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      // Tilt it back towards the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true,
      );
    }
  });
  strapTexture.wrapS = THREE.RepeatWrapping;
  strapTexture.wrapT = THREE.RepeatWrapping;
  strapTexture.needsUpdate = true;

  useEffect(() => {
    const handleMouseUp = () => {
      drag(null); // hoặc set dragged = null
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp); // cho mobile

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          angularDamping={2}
          linearDamping={2}
          type="fixed"
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          angularDamping={2}
          linearDamping={2}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <mesh
            onPointerUp={(e: React.PointerEvent) => {
              const target = e.target as HTMLElement | null;
              target?.releasePointerCapture(e.pointerId);
              drag(null);
            }}
            onPointerDown={(e) => {
              const target = e.target as HTMLElement | null;
              target?.releasePointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation())),
              );
            }}
          >
            <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
            <meshBasicMaterial
              map={texture}
              side={THREE.DoubleSide}
              transparent
            />
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          opacity={1}
          depthTest={false}
          resolution={[width, height]}
          lineWidth={1}
          useMap={true}
          map={strapTexture}
        />
      </mesh>
    </>
  );
}
