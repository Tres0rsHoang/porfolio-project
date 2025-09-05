"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./about_me.module.css";
import Education from "../education";
import OnWorking from "../on_working";
import { scrollToSection } from "@/helpers/scroll_to_section";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type ExpandItems = {
  educationExpanded: boolean;
  workExperienceExpanded: boolean;
};

function AboutMe() {
  const [expandItems, setExpandItems] = useState<ExpandItems>({
    educationExpanded: false,
    workExperienceExpanded: false,
  });

  const toggleEducationExpand = () => {
    setExpandItems((prev) => ({
      educationExpanded: !prev.educationExpanded,
      workExperienceExpanded: false,
    }));
  };

  const toggleWorkingExperinceExpand = () => {
    setExpandItems((prev) => ({
      workExperienceExpanded: !prev.workExperienceExpanded,
      educationExpanded: false,
    }));
  };

  const { t } = useTranslation("home");

  return (
    <div className="relative">
      <div className={styles.aboutMeContainer}>
        <AnimatePresence>
          <motion.button
            onClick={() => scrollToSection("comment")}
            animate={{
              rotate: [2, -2, 2],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-1.2rem] px-5 rounded-xl right-50 bg-(--highlight-button) border-solid border-[3px]"
          >
            <div className="text-3xl">{t("go_to_comment_section")} →</div>
          </motion.button>
        </AnimatePresence>
        <h2>{t("about_me")}</h2>
        <div className="flex flex-row justify-between">
          <div className="relative w-52 h-52">
            <Image
              fill={true}
              src="/images/ProfilePicSimpson.png"
              alt="circle pic"
              className="rounded-full border-2 border-solid border-(--foreground)"
            ></Image>
          </div>
          <div className="w-4/5 pl-5">
            <p>
              {t("about_me_description_1")}
              <span className="text-(--red) text-2xl">{t("8_years")}</span>
              {t("about_me_description_2")}
              <span className="text-(--blue) text-2xl">{t("2_years")}</span>
              {t("about_me_description_3")}
              {t("about_me_description_4")}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${styles.moreAboutMeContent} ${
          expandItems.educationExpanded ? styles.expanded : ""
        } flex flex-row justify-around items-start`}
      >
        <Education />
      </div>
      <div
        className={`${styles.moreAboutMeContent} ${
          expandItems.workExperienceExpanded ? styles.expanded : ""
        } flex flex-row justify-around items-start`}
      >
        <OnWorking />
      </div>
      <div
        className={`${styles.toggleButtonContainer} ${
          Object.values(expandItems).some((value) => value === true)
            ? styles.isExpanded
            : ""
        }`}
      >
        <button
          className={`${styles.toggleButton}`}
          onClick={toggleEducationExpand}
        >
          <h3>
            {expandItems.educationExpanded ? t("collapse") : t("education")}
          </h3>
        </button>
        <button
          className={`${styles.toggleButton}`}
          onClick={toggleWorkingExperinceExpand}
        >
          <h3>
            {expandItems.workExperienceExpanded ? t("collapse") : t("careers")}
          </h3>
        </button>
      </div>
    </div>
  );
}

export default AboutMe;
