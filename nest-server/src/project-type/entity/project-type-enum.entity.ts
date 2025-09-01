export enum ProjectType {
  Mobile = 'Mobile',
  Web = 'Web',
  System = 'System',
  Admin = 'Admin',
  Game = 'Game',
  Default = 'Default',
}

export function toProjectType(value: string): ProjectType | undefined {
  if (Object.values(ProjectType).includes(value as ProjectType)) {
    return value as ProjectType;
  }
  return undefined;
}
