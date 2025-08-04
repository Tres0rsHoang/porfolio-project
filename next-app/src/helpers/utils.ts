import { ProjectType } from "@/models/project.model";

export function getProjectTypeImagePath(projectType: ProjectType) {
  const defaultPath = "/images";
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

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
