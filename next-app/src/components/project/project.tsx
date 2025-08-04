"use client";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styles from "./project.module.css";
import { PieSectorData } from "recharts/types/polar/Pie";
import {
  ChartData,
  ChartProps,
  Framework,
  Language,
  mapStringToFramework,
  mapStringToLanguage,
  mapStringToProjectType,
  PercentProps,
  ProjectInfo,
  ProjectType,
} from "@/models/project.model";
import ProjectFrame from "./project_frame";
import { getRandomColor } from "@/helpers/utils";

const DataPieChart: React.FC<ChartProps> = ({ data, title }) => {
  const renderLabel = ({ percent }: PieSectorData) => {
    if (percent == null) return "";
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

function PercentFramework({ projects }: PercentProps) {
  const percentArray: Array<number> = [];
  const data: Array<ChartData> = [];

  const frameworkArray = Object.values(Framework).filter(
    (value) => typeof value === "string",
  );

  for (let i = 0; i < frameworkArray.length - 1; i++) {
    percentArray[i] = 0;
  }

  for (const project of projects) {
    for (const framework of project.techstack) {
      const index = frameworkArray.indexOf(framework);
      percentArray[index] += 1;
    }
  }

  for (let i = 0; i < frameworkArray.length - 1; i++) {
    if (percentArray[i] == 0) continue;
    data.push({
      name: frameworkArray[i],
      value: percentArray[i],
      color: getRandomColor(),
    });
  }

  return <DataPieChart data={data} title="Framework" />;
}

function PercentLanguage({ projects }: PercentProps) {
  const percentArray: Array<number> = [];
  const data: Array<ChartData> = [];
  const languageArray = Object.values(Language).filter(
    (value) => typeof value === "string",
  );

  for (let i = 0; i < languageArray.length - 1; i++) {
    percentArray[i] = 0;
  }

  for (const project of projects) {
    for (const lang of project.language) {
      const index = languageArray.indexOf(lang);
      percentArray[index] += 1;
    }
  }

  for (let i = 0; i < languageArray.length - 1; i++) {
    if (percentArray[i] == 0) continue;
    data.push({
      name: languageArray[i],
      value: percentArray[i],
      color: getRandomColor(),
    });
  }

  return <DataPieChart data={data} title="Language"></DataPieChart>;
}

export default function Project() {
  const [showDialog, setShowDialog] = useState(false);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/project/feature`,
      );
      const resBody = await res.json();

      if (!Array.isArray(resBody)) return;

      const formatedProject: ProjectInfo[] = resBody.map(
        (value: {
          name: string;
          title: string;
          frameworks: string[];
          languages: string[];
          projectType: string;
        }) => {
          const frameworks: Framework[] = [];
          const languages: Language[] = [];

          value.frameworks.map((framework: string) => {
            const fw: Framework | undefined = mapStringToFramework(framework);
            if (fw) frameworks.push(fw);
          });

          value.languages.map((language: string) => {
            const lang: Language | undefined = mapStringToLanguage(language);
            if (lang) languages.push(lang);
          });

          const projectInfo: ProjectInfo = {
            projectName: value.name,
            techstack: frameworks,
            language: languages,
            projectType:
              mapStringToProjectType(value.projectType) ?? ProjectType.Default,
          };
          return projectInfo;
        },
      );
      setProjects(formatedProject);
    };

    fetchProject();
  });

  return (
    <div className={styles.projectContainer}>
      <div className="flex justify-between items-center">
        <h2>Feature Project</h2>
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
              <h2 className="text-xl font-bold mb-4">Summarize</h2>
              <button
                className={`bg-(--red) px-3 rounded-lg border-solid border-[2px] h-10 w-10`}
                onClick={() => setShowDialog(false)}
              >
                X
              </button>
            </div>
            <div className="flex flex-row justify-around items-center">
              <PercentFramework projects={projects} />
              <PercentLanguage projects={projects} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
