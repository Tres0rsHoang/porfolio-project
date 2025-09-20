import {
  mapStringToProjectType,
  Project,
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

  const formatedProject: Project[] = resBody.map(
    (value: {
      id: number;
      name: string;
      title: string;
      frameworks: string[];
      languages: string[];
      projectType: string;
    }) => {
      const projectInfo: Project = {
        id: value.id,
        name: value.name,
        frameworks: value.frameworks,
        languages: value.languages,
        types: [
          mapStringToProjectType(value.projectType) ?? ProjectType.Default,
        ],
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
  let data: Project[] = [];
  if (result) data = result;
  return { data, isLoading, error, refetch };
}
