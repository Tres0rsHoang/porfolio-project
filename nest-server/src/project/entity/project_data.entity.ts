export type ProjectData = {
  id: number;
  name: string;
  title: string;
  description: string;
  teamSize: number;
  role: string;
  startAt: Date;
  endAt: Date;
  ResponsibilityOnProject: Array<{
    responsibility: string;
  }>;
  FrameworkOnProject: Array<{
    framework: {
      id: number;
      name: string;
      LanguageOnFramework: Array<{
        Language: {
          id: number;
          displayString: string;
        };
      }>;
    };
  }>;
  TypeOnProject: Array<{
    type: { id: number; name: string };
  }>;
};

export type SimplifyProjectData = {
  id: number;
  name: string;
  title: string;
  teamSize: number;
  role: string;
  description: string;
  responsibilities: Array<string>;
  startAt: Date;
  endAt: Date;
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
};
