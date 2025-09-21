import { getRandomColor } from "@/helpers/utils";
import { ChartData, ChartProps, PercentProps } from "@/models/project.model";
import { useTranslation } from "react-i18next";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const DataPieChart: React.FC<ChartProps> = ({ data, title }) => {
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
          label
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
  const chartData: ChartData[] = [];
  const { t } = useTranslation("home");

  for (const project of projects) {
    for (const framework of project.frameworks) {
      let exist = false;
      for (const index in chartData) {
        const name = chartData[index].name;
        if (name == framework) {
          chartData[index].value += 1;
          exist = true;
          break;
        }
      }
      if (!exist) {
        chartData.push({
          name: framework,
          value: 1,
          color: getRandomColor(),
        });
      }
    }
  }
  return <DataPieChart data={chartData} title={t("used_frameworks")} />;
}

export function PercentLanguage({ projects }: PercentProps) {
  const chartData: ChartData[] = [];
  const { t } = useTranslation("home");

  for (const project of projects) {
    for (const language of project.languages) {
      let exist = false;
      for (const index in chartData) {
        const name = chartData[index].name;
        if (name == language) {
          chartData[index].value += 1;
          exist = true;
          break;
        }
      }
      if (!exist) {
        chartData.push({
          name: language,
          value: 1,
          color: getRandomColor(),
        });
      }
    }
  }

  return (
    <DataPieChart data={chartData} title={t("used_languages")}></DataPieChart>
  );
}
