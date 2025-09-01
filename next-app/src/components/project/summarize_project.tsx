import { getRandomColor } from "@/helpers/utils";
import {
  ChartData,
  ChartProps,
  Framework,
  Language,
  PercentProps,
} from "@/models/project.model";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { PieSectorData } from "recharts/types/polar/Pie";

export const DataPieChart: React.FC<ChartProps> = ({ data, title }) => {
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

export function PercentFramework({ projects }: PercentProps) {
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

export function PercentLanguage({ projects }: PercentProps) {
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
