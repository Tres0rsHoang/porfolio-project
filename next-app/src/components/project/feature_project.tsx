"use client";
import Marquee from "react-fast-marquee";
import styles from "./project.module.css";
import ProjectFrame from "./project_frame";
import { DialogFrame } from "../dialog/dialog_frame";
import EmptyComment from "../comments/empty_comment";
import { PercentFramework, PercentLanguage } from "./summarize_project";
import useFeatureProject from "@/hooks/useFeatureProjects";
import { useTranslation } from "react-i18next";

export default function FeatureProject() {
  const { data: projects } = useFeatureProject();
  const { t } = useTranslation("home");

  return (
    <div className={styles.projectContainer}>
      <div className="flex justify-between items-center">
        <h2>{t("feature_project")}</h2>
        <DialogFrame
          title={t("summarize")}
          toggleItem={
            <button className={`${styles.summarize} px-4 rounded-lg`}>
              <h3>{t("summarize")}</h3>
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
            return <ProjectFrame key={i} project={project} />;
          })}
        </Marquee>
      )}
    </div>
  );
}
