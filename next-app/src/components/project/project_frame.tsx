"use client";
import Image from "next/image";
import styles from "../project/project.module.css";
import React from "react";
import { Project, ProjectType } from "@/models/project.model";
import { getProjectTypeImagePath } from "@/helpers/utils";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const ProjectFrame = ({ project }: { project: Project }) => {
  let techstackLine = "";
  const router = useRouter();

  const { t } = useTranslation("home");
  project.frameworks.map((element, i) => {
    techstackLine += element;
    if (i != project.frameworks.length - 1) techstackLine += " • ";
  });

  return (
    <div className={`${styles.projectFrame}`}>
      <div className="absolute top-0 left-0 ml-2 mt-2 bg-(--background) w-33 h-27 flex justify-center items-center pl-3 pt-2">
        <Image
          src={getProjectTypeImagePath(project.types[0] ?? ProjectType.Default)}
          width={80}
          height={80}
          alt="ProjectType"
          className={`${styles.floating} max-h-20 w-auto`}
        />
      </div>
      <div className="relative w-[200px] h-auto">
        <Image
          src="/images/ProjectFrame.png"
          alt="ProjectFrame"
          width={200}
          height={100}
        />
      </div>
      <div className={`absolute top-0 left-0 mt-34 ml-5 w-[78%]`}>
        <div className="flex">
          <h3 className={`${styles.projectName}`}>{project.name}</h3>
        </div>
        <div className={`flex`}>
          <p className={`${styles.techstackLine}`}>{techstackLine}</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-[23px]">
        <button
          onClick={() => router.push(`/project/${project.id}`)}
          className={`rounded-lg px-2 ${styles.detailButton}`}
        >
          <p>{t("more_detail")}</p>
        </button>
      </div>
    </div>
  );
};

export default ProjectFrame;
