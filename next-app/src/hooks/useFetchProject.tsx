import { ProjectSearchFormData } from "@/app/project/page";
import { Paging } from "@/models/paging.model";
import {
  mapStringToProjectType,
  Project,
  RawProject,
} from "@/models/project.model";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

interface ProjectPage {
  projects: Array<Project>;
  paging: Paging;
}

const fetchProject = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam: number;
  queryKey: QueryKey;
}): Promise<ProjectPage> => {
  const [, searchParams] = queryKey;

  const searchQuery: ProjectSearchFormData =
    searchParams as ProjectSearchFormData;
  const searchQueryKey = Object.keys(
    searchQuery,
  ) as (keyof ProjectSearchFormData)[];
  let searchString = "";
  for (const key of searchQueryKey) {
    if (!searchQuery[key]) continue;
    searchString += `&${key.toString()}=${searchQuery[key].toString()}`;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project?page=${pageParam}${searchString}`,
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

export function useFetchProjects(searchParams: ProjectSearchFormData) {
  return useInfiniteQuery({
    queryKey: ["projects", searchParams],
    queryFn: ({ pageParam, queryKey }) => fetchProject({ pageParam, queryKey }),
    getNextPageParam: (data) => data.paging.nextPage,
    enabled: !!searchParams,
    initialPageParam: 1,
  });
}
