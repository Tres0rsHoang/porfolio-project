"use client";
import Marquee from "react-fast-marquee";
import styles from "./project.module.css";
import ProjectFrame from "./project_frame";
import { DialogFrame } from "../dialog/dialog_frame";
import EmptyComment from "../comments/empty_comment";
import { PercentFramework, PercentLanguage } from "./summarize_project";
import useFeatureProject from "@/hooks/useFeatureProject";

export default function FeatureProject() {
  const { data: projects } = useFeatureProject();

  return (
    <div className={styles.projectContainer}>
      <div className="flex justify-between items-center">
        <h2>Feature Project</h2>
        <DialogFrame
          title="Summarize"
          toggleItem={
            <button className={`${styles.summarize} px-4 rounded-lg`}>
              <h3>Summarize</h3>
            </button>
          }
        >
          <div className="flex flex-row justify-around items-center">
            <PercentFramework projects={projects} />
            <PercentLanguage projects={projects} />
          </div>
        </DialogFrame>
      </div>
      {projects.length == 0 ? (
        <div className="mb-4">
          <EmptyComment />
        </div>
      ) : (
        <Marquee speed={50} gradient={false} pauseOnHover>
          {projects.map((project, i) => {
            return (
              <ProjectFrame
                key={i}
                projectName={project.projectName}
                techstack={project.techstack}
                language={project.language}
                projectType={project.projectType}
              />
            );
          })}
        </Marquee>
      )}
    </div>
  );
}
