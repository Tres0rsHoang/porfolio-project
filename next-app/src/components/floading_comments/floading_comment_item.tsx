"use client";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Comment } from "@/models/comment.model";
import { useUserStore } from "@/store/user.store";
import { motion, Point } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ItemProps {
  comment: Comment;
  animate?: boolean;
}

export const FloadingCommentItem = (props: ItemProps) => {
  const { width, height } = useWindowSize();
  const { user } = useUserStore();
  const [nextPosition, setNextPosition] = useState<Point | null>(null);

  const defaultTime = 10;
  const itemRef = useRef<HTMLDivElement>(null);

  const randomNumber = (props: { min: number; max: number }): number => {
    return Math.floor(Math.random() * (props.max - props.min + 1)) + props.min;
  };

  const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    const saturation = 40 + (Math.abs(hash) % 40);
    const lightness = 30 + (Math.abs(hash) % 30);
    return hslToHex(hue, saturation, lightness);
  };

  function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      Math.round(
        (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255,
      );

    return `#${[f(0), f(8), f(4)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")}`;
  }

  useEffect(() => {
    function changeMovingPosition() {
      if (!itemRef.current) return;

      const rect = itemRef.current.getBoundingClientRect();
      const boundingPoint: Point = {
        x: rect.width,
        y: rect.height,
      };
      setNextPosition({
        x: randomNumber({ min: 0, max: (width ?? 0) - boundingPoint.x }),
        y: randomNumber({ min: 0, max: (height ?? 0) - boundingPoint.y }),
      });
    }

    changeMovingPosition();
    const interval = setInterval(changeMovingPosition, defaultTime * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [height, setNextPosition, width]);

  if (!props.animate) {
    return (
      <div
        className={`${props.comment.user.id == user?.id ? "opacity-100" : "opacity-30"} text-3xl border-black border-2 w-xs rounded-lg px-2 bg-(--semi-highlight)`}
      >
        <span
          style={{
            color: stringToColor(props.comment.user.name),
          }}
        >
          {props.comment.user.name}:{" "}
        </span>
        <span>{props.comment.content.slice(0, 50)}</span>
        {props.comment.content.length > 50 && <span>...</span>}
      </div>
    );
  }

  if (!width || !height) return <></>;

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0 }}
      animate={{ opacity: props.comment.user.id == user?.id ? 1 : 0.3 }}
      transition={{ duration: 3 }}
    >
      <motion.div
        ref={itemRef}
        className="text-3xl border-black border-2 max-w-xs min-w-xs rounded-lg px-2 bg-(--semi-highlight)"
        initial={{
          x: randomNumber({ min: 0, max: width - 320 }),
          y: randomNumber({ min: 0, max: height - 220 }),
        }}
        animate={{
          x: nextPosition?.x,
          y: nextPosition?.y,
        }}
        transition={{
          duration: defaultTime,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      >
        <span
          style={{
            color: stringToColor(props.comment.user.name),
          }}
        >
          {props.comment.user.name}:{" "}
        </span>
        <span>{props.comment.content.slice(0, 50)}</span>
        {props.comment.content.length > 50 && <span>...</span>}
      </motion.div>
    </motion.div>
  );
};
