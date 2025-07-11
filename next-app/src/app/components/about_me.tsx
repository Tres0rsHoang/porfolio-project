"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./about_me.module.css";
import Education from "./education";
import OnWorking from "./on_working";

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

  return (
    <div className="relative">
      <div className={styles.aboutMeContainer}>
        <button className="absolute top-[-1.2rem] px-5 rounded-xl right-50 bg-(--highlight-button) border-solid border-[3px]">
          <div className="text-3xl">Go to Comment →</div>
        </button>
        <h2>About Me</h2>
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
              I’m a programmer with 8 years of experience in learning and
              working with code, and 2 years of hands-on experience in web
              development, mobile app development, database design, system
              architecture, and deployment.
            </p>
            <p>
              I have a deep passion for knowledge — especially in programming
              and technology — which has always been the driving force behind my
              dedication to every project I take on.
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
          <h3>{expandItems.educationExpanded ? "Collapse" : "Education"}</h3>
        </button>
        <button
          className={`${styles.toggleButton}`}
          onClick={toggleWorkingExperinceExpand}
        >
          <h3>{expandItems.workExperienceExpanded ? "Collapse" : "Careers"}</h3>
        </button>
      </div>
    </div>
  );
}

export default AboutMe;
