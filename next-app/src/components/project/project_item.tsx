import { getProjectTypeImagePath } from "@/helpers/utils";
import styles from "../project/project.module.css";
import { Project, ProjectType } from "@/models/project.model";
import Image from "next/image";

export const ProjectItem = ({ project }: { project: Project }) => {
  const formatedStartAt = project.startAt.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const formatedEndAt = project.endAt.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return (
    <div
      className="relative 
      w-full
      bg-(--semi-highlight) 
      rounded-bl-lg rounded-tl-3xl 
      p-5 pt-0
      border-s-black border-5 border-r-0"
    >
      <div className="flex flex-row justify-center">
        <div
          className="w-44 h-12 
          border-3 border-s-black border-t-0 
          rounded-t-none rounded-xl
          flex flex-row"
        >
          <div
            className="h-full w-32 relative
            border-b-3 border-r-3 border-s-black
            rounded-t-none rounded-xl"
          ></div>
        </div>
      </div>

      <div className="flex flex-row flex-1 h-full">
        <div
          className="relative 
          w-1/5 h-auto
          overflow-hidden bg-(--background)/80 
          border-s-black border-2 rounded-xl 
          flex justify-center items-center"
        >
          <div className="w-32 h-32 absolute bg-(--background)/80 rounded-full" />
          <Image
            src={getProjectTypeImagePath(
              project.types[0] ?? ProjectType.Default,
            )}
            width={40}
            height={40}
            alt="ProjectType"
            className={`${styles.floating} h-16 w-auto`}
          />
        </div>
        <div className="ml-5 flex flex-col w-3/5">
          <div>
            <h3 className="text-xl">{project.name}</h3>
            <p>
              <span>{formatedStartAt}</span>
              <span> - </span>
              <span>{formatedEndAt}</span>
            </p>
          </div>
          <p className="text-xl">
            <span className="font-medium">Framework</span>
            <span>: </span>
            <span>
              {project.frameworks.map((data, index) =>
                index != project.frameworks.length - 1
                  ? `${data}, `
                  : `${data}.`,
              )}
            </span>
          </p>
          <p>
            <span className="font-medium">Languages</span>
            <span>: </span>
            <span>
              {project.languages.map((data, index) =>
                index != project.languages.length - 1
                  ? `${data}, `
                  : `${data}.`,
              )}
            </span>
          </p>
          <p className="h-32">
            <span className="font-medium">Description</span>
            <span>: </span>
            <span>{project.description.slice(0, 200)}</span>
            <span>{project.description.length > 200 ? "..." : ""}</span>
          </p>
        </div>
        <div className="ml-auto flex flex-col justify-center">
          <Image
            src="/images/LeftRedArrow.png"
            alt="Arrow"
            width={80}
            height={80}
            className="rotate-180"
          />
        </div>
      </div>
    </div>
  );
};
