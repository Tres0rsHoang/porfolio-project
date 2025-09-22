"use client";
import { useFetchProjects } from "@/hooks/useFetchProject";
import { ProjectItem } from "../../components/project/project_item";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/form/input.field";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { LoadingDonuts } from "@/components/loading/loading_more";
import { useEffect, useRef, useState } from "react";

export interface ProjectSearchFormData {
  projectName?: string;
}

export default function Project() {
  const { t } = useTranslation("project");
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const {
    watch,
    register,
    formState: { errors },
  } = useForm<ProjectSearchFormData>();
  const projectName = watch("projectName");

  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const {
    data: projectPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useFetchProjects({
    projectName: debouncedValue,
  });

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(projectName ?? "");
    }, 500);
    return () => clearTimeout(timer);
  }, [projectName]);

  return (
    <div>
      <form className="mb-5 mr-5">
        <InputField
          placeholder={t("project_name_input")}
          name="projectName"
          register={register}
          icon=<Search />
          error={errors.projectName}
        />
      </form>
      <div className="flex flex-col gap-5">
        <AnimatePresence>
          {projectPages?.pages
            .flatMap((data) => data.projects)
            .map((data) => (
              <ProjectItem key={data.id} project={data} />
            ))}
        </AnimatePresence>

        <div className="flex flex-row justify-center items-center">
          <LoadingDonuts isShow={isLoading} />
        </div>
        <div ref={loadMoreRef}></div>
      </div>
    </div>
  );
}
