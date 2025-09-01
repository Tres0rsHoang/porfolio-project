import {
  mapStringToProjectType,
  ProjectInfo,
  ProjectType,
} from "@/models/project.model";
import { useQuery } from "@tanstack/react-query";

async function fetchFeatureProject() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/feature`,
  );
  const resBody = await res.json();
  if (!Array.isArray(resBody) || !res.ok) {
    throw new Error("Invalid project/feature responsive");
  }

  const formatedProject: ProjectInfo[] = resBody.map(
    (value: {
      name: string;
      title: string;
      frameworks: string[];
      languages: string[];
      projectType: string;
    }) => {
      const projectInfo: ProjectInfo = {
        projectName: value.name,
        techstack: value.frameworks,
        language: value.languages,
        projectType:
          mapStringToProjectType(value.projectType) ?? ProjectType.Default,
      };
      return projectInfo;
    },
  );

  return formatedProject;
}

export default function useFeatureProject() {
  const {
    data: result,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["featureProject"],
    queryFn: fetchFeatureProject,
  });
  let data: ProjectInfo[] = [];
  if (result) data = result;
  return { data, isLoading, error, refetch };
}
