export type ChartData = {
  name: string;
  value: number;
  color: string;
};

export type ChartProps = {
  data: Array<ChartData>;
  title: string;
};

export type PercentProps = {
  projects: ProjectInfo[];
};

export enum Framework {
  ExpressJS = "ExpressJS",
  FacebookAPI = "FacebookAPI",
  Firebase = "Firebase",
  Flutter = "Flutter",
  NestJs = "NestJs",
  PHP = "PHP",
  RabitMQ = "RabitMQ",
  Smarty = "Smarty",
  SocketIO = "SocketIO",
  Unity = "Unity",
  ZaloMiniAppReact = "Zalo Mini App - React",
  ZaloAPI = "ZaloAPI",
  JQuery = "jQuery",
}

export function mapStringToFramework(value: string): Framework | undefined {
  if (Object.values(Framework).includes(value as Framework)) {
    return value as Framework;
  }
  return undefined;
}
export enum Language {
  PHP = "PHP",
  Javascript = "Javascript",
  Java = "Java",
  Cpp = "Cpp",
  Python = "Python",
  HtmlCss = "HtmlCss",
  Typescript = "Typescript",
  shellscript = "shellscript",
  SQL = "SQL",
  Dart = "Dart",
  ZaloServices = "Zalo Services",
  FacebookServices = "Facebook Services",
  GoogleServices = "Google Services",
  RedisServices = "Redis Services",
}

export function mapStringToLanguage(value: string): Language | undefined {
  if (Object.values(Language).includes(value as Language)) {
    return value as Language;
  }
  return undefined;
}

export enum ProjectType {
  Mobile = "Mobile",
  Web = "Web",
  System = "System",
  Admin = "Admin",
  Default = "Default",
  Game = "Game",
}

export function mapStringToProjectType(value: string): ProjectType | undefined {
  if (Object.values(ProjectType).includes(value as ProjectType)) {
    return value as ProjectType;
  }
  return undefined;
}

export type ProjectInfo = {
  projectName: string;
  techstack: Array<string>;
  language: Array<string>;
  projectType?: ProjectType;
};
