"use client";
import Image from "next/image";
import styles from "./project.module.css";

import React from "react";

export enum Framework {
    React,
    Express,
    NestJS,
    DotNet,
    Flutter,
    SpringBoot,
    MySQL,
    PostgreSQL,
    RabitMQ,
    BullMQ,
    Redis,
    NextJS,
}

export enum Language {
    PHP,
    Javascript,
    Java,
    Cpp,
    Python,
    HtmlCss,
    Typescript,
    shellscript,
    SQL,
}

export enum ProjectType {
    Mobile,
    Web,
    System,
    Admin,
    Default,
    Game,
}

export type ProjectInfo = {
    projectName: string;
    techstack: Array<Framework>;
    language: Array<Language>;
    projectType?: ProjectType;
};

function getProjectTypeImagePath(projectType: ProjectType) {
    let defaultPath = "/images";
    switch (projectType) {
        case ProjectType.Admin:
            return defaultPath + "/Admin.png";
        case ProjectType.Mobile:
            return defaultPath + "/Mobile.png";
        case ProjectType.System:
            return defaultPath + "/System.png";
        case ProjectType.Web:
            return defaultPath + "/Web.png";
        case ProjectType.Game:
            return defaultPath + "/Default.png";
        default:
            return defaultPath + "/Default.png";
    }
}

const ProjectFrame: React.FC<ProjectInfo> = ({
    projectName,
    techstack,
    language,
    projectType = ProjectType.Default,
}) => {
    return (
        <div className={`${styles.projectFrame}`}>
            <div className="absolute top-0 left-0 ml-2 mt-2 bg-(--background) w-33 h-27 flex justify-center items-center pl-3 pt-2">
                <Image
                    src={getProjectTypeImagePath(projectType)}
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
                <div className="w-full overflow-clip whitespace-nowrap">
                    <h3 className="">{projectName}</h3>
                </div>
                <div
                    className={`flex flex-wrap ${styles.techstackMultilineEllipsis}`}
                >
                    {techstack.map((tech, i) => {
                        return (
                            <div key={i} className="mr-1">
                                {Framework[tech]}
                                {i != techstack.length - 1 && (
                                    <span className="ml-1">&#8226;</span>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="w-full mt-1 ml-3">
                    <button
                        className={`rounded-lg px-2 ${styles.detailButton}`}
                    >
                        <p>More Detail</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectFrame;

