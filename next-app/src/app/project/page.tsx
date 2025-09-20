"use client";
import { useFetchProjects } from "@/hooks/useFetchProject";
import { ProjectItem } from "../../components/project/project_item";
import { useUserStore } from "@/store/user.store";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/form/input.field";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

interface SearchFormData {
  projectName?: string;
}

export default function Project() {
  const { data: projectPages } = useFetchProjects();
  const { user } = useUserStore();
  const { t } = useTranslation("project");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>();

  const onSearch = (data: SearchFormData) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSearch)} className="mb-5 mr-5">
        <InputField
          placeholder={t("project_name_input")}
          name="projectName"
          register={register}
          icon=<Search />
          error={errors.projectName}
        />
      </form>
      <div className="flex flex-col gap-5">
        {projectPages?.pages
          .flatMap((data) => data.projects)
          .map((data) => (
            <ProjectItem key={data.id} project={data} />
          ))}
      </div>
    </div>
  );
}
