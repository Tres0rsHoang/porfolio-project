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
  projects: Project[];
};

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

export type Project = {
  id: number;
  name: string;
  description: string;
  role: string;
  startAt: Date;
  endAt: Date;
  responsibilities: Array<string>;
  frameworks: Array<string>;
  languages: Array<string>;
  types: Array<ProjectType>;
};

export interface RawProject {
  id: number;
  title: string;
  name: string;
  teamSize: number;
  description: string;
  role: string;
  startAt: string;
  endAt: string;
  responsibilities: Array<string>;
  frameworks: Array<{
    id: number;
    name: string;
  }>;
  languages: Array<{
    id: number;
    name: string;
  }>;
  types: Array<{
    id: number;
    name: string;
  }>;
}
