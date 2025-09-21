import {
  mapStringToProjectType,
  Project,
  ProjectType,
  RawProject,
} from "@/models/project.model";
import { useQuery } from "@tanstack/react-query";

async function fetchFeatureProject() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/feature`,
  );
  const resBody = await res.json();

  if (!Array.isArray(resBody.data) || !res.ok) {
    throw new Error("Invalid project/feature responsive");
  }

  const formatedProject: Project[] = resBody.data.map((value: RawProject) => {
    const projectInfo: Project = {
      id: value.id,
      name: value.name,
      description: value.description,
      role: value.role,
      startAt: new Date(value.startAt),
      endAt: new Date(value.endAt),
      responsibilities: value.responsibilities.map((value) => value),
      frameworks: value.frameworks.map((value) => value.name),
      languages: value.languages.map((value) => value.name),
      types: value.types.map(
        (value) => mapStringToProjectType(value.name) ?? ProjectType.Default,
      ),
    };
    return projectInfo;
  });

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
