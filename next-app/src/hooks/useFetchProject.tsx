import { Paging } from "@/models/paging.model";
import {
  mapStringToProjectType,
  Project,
  RawProject,
} from "@/models/project.model";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ProjectPage {
  projects: Array<Project>;
  paging: Paging;
}

const fetchProject = async ({ pageParam = 1 }): Promise<ProjectPage> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project?page=${pageParam}`,
  );

  if (!res.ok) {
    return {
      projects: [],
      paging: {
        total: 0,
        limit: 0,
        page: 0,
        totalPage: 0,
      },
    };
  }

  const resData = await res.json();

  const projects: Array<Project> = resData.data.map((project: RawProject) => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      role: project.role,
      startAt: new Date(project.startAt),
      endAt: new Date(project.endAt),
      responsibilities: project.responsibilities,
      frameworks: project.frameworks.map((data) => data.name),
      languages: project.languages.map((data) => data.name),
      types: project.types.map((data) => mapStringToProjectType(data.name)),
    };
  });

  return {
    projects: projects,
    paging: resData.paging,
  };
};

export function useFetchProjects() {
  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProject,
    getNextPageParam: (data) => data.paging.nextPage,
    initialPageParam: 1,
  });
}
