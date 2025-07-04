"use client";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styles from "./project.module.css";
import ProjectFrame, {
    Framework,
    Language,
    ProjectInfo,
    ProjectType,
} from "./project_frame";

const projects: Array<ProjectInfo> = [
    {
        projectName: "Project One with a long long long name",
        techstack: [Framework.Flutter, Framework.Express, Framework.MySQL],
        language: [Language.Typescript],
        projectType: ProjectType.Mobile,
    },
    {
        projectName: "Project Two",
        techstack: [
            Framework.BullMQ,
            Framework.Redis,
            Framework.NestJS,
            Framework.NextJS,
        ],
        language: [Language.Typescript],
        projectType: ProjectType.Web,
    },
    {
        projectName: "Project Three",
        techstack: [
            Framework.BullMQ,
            Framework.Redis,
            Framework.NestJS,
            Framework.NextJS,
        ],
        language: [Language.Typescript],
        projectType: ProjectType.Mobile,
    },
    {
        projectName: "Project Four",
        techstack: [
            Framework.BullMQ,
            Framework.Redis,
            Framework.NestJS,
            Framework.NextJS,
        ],
        language: [Language.Typescript],
        projectType: ProjectType.Admin,
    },
    {
        projectName: "Project Five",
        techstack: [
            Framework.BullMQ,
            Framework.Redis,
            Framework.NestJS,
            Framework.NextJS,
        ],
        language: [Language.Typescript],
        projectType: ProjectType.Game,
    },
    {
        projectName: "Project Six",
        techstack: [
            Framework.BullMQ,
            Framework.Redis,
            Framework.NestJS,
            Framework.NextJS,
        ],
        language: [Language.Typescript],
        projectType: ProjectType.System,
    },
];

interface ChartData {
    name: string;
    value: number;
    color: string;
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

type ChartProps = {
    data: Array<ChartData>;
    title: string;
};

const DataPieChart: React.FC<ChartProps> = ({ data, title }) => {
    const renderLabel = ({ name, value, percent }: any) => {
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <div className="flex flex-col items-center">
            <h3>{title}</h3>
            <PieChart width={300} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    dataKey="value"
                    isAnimationActive={true}
                    stroke="black"
                    strokeWidth={2}
                    label={renderLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{
                        background: "#FAE3B2",
                        border: "black solid 2px",
                        borderRadius: "0.5rem",
                        minHeight: "52px",
                    }}
                />
            </PieChart>
        </div>
    );
};

function PercentFramework() {
    let percentArray: Array<number> = [];
    let data: Array<ChartData> = [];
    let FrameworkArray = Object.values(Framework).filter(
        (value) => typeof value === "string"
    );
    for (let i = 0; i < FrameworkArray.length - 1; i++) {
        percentArray[i] = 0;
    }
    for (let project of projects) {
        for (let framework of project.techstack) {
            percentArray[framework] += 1;
        }
    }
    for (let i = 0; i < FrameworkArray.length - 1; i++) {
        if (percentArray[i] == 0) continue;
        data.push({
            name: FrameworkArray[i],
            value: percentArray[i],
            color: getRandomColor(),
        });
    }
    return <DataPieChart data={data} title="Framework" />;
}

function PercentLanguage() {
    let percentArray: Array<number> = [];
    let data: Array<ChartData> = [];
    let LanguageArray = Object.values(Language).filter(
        (value) => typeof value === "string"
    );
    for (let i = 0; i < LanguageArray.length - 1; i++) {
        percentArray[i] = 0;
    }
    for (let project of projects) {
        for (let lang of project.language) {
            percentArray[lang] += 1;
        }
    }
    for (let i = 0; i < LanguageArray.length - 1; i++) {
        if (percentArray[i] == 0) continue;
        data.push({
            name: LanguageArray[i],
            value: percentArray[i],
            color: getRandomColor(),
        });
    }
    return <DataPieChart data={data} title="Language"></DataPieChart>;
}

export default function Project() {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className={styles.projectContainer}>
            <div className="flex justify-between items-center">
                <h2>Project</h2>
                <button
                    className={`${styles.summarize} px-4 rounded-lg`}
                    onClick={() => setShowDialog(true)}
                >
                    <h3>Summarize</h3>
                </button>
            </div>
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
            {showDialog && (
                <div>
                    <div
                        className="dialog-background"
                        onClick={() => setShowDialog(false)}
                    />
                    <div className="dialog bg-(--semi-highlight)">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-xl font-bold mb-4">
                                Summarize
                            </h2>
                            <button
                                className={`bg-(--red) px-3 rounded-lg border-solid border-[2px] h-10 w-10`}
                                onClick={() => setShowDialog(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <PercentFramework />
                            <PercentLanguage />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

