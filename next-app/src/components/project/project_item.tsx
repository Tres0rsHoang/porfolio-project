import { getProjectTypeImagePath } from "@/helpers/utils";
import styles from "../project/project.module.css";
import { Project, ProjectType } from "@/models/project.model";
import Image from "next/image";
import AnimateSection from "../animate_section";

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
    <AnimateSection
      className="relative 
      w-full
      bg-[#3C3E44]
      rounded-bl-lg rounded-tl-3xl 
      p-5 pt-0
      border-s-black border-5 border-r-0"
    >
      <div className="mb-5 flex flex-row justify-center">
        <div
          className="w-44 h-12 relative
          border-3 border-s-black border-t-0 
          rounded-t-none rounded-xl"
        >
          <div
            className="h-[48px] w-40 bg-[#C1C6CD] absolute
            -left-[3px]
            border-3 border-t-0 border-s-black
            flex justify-end flex-row
            p-1
            pr-2
            rounded-t-none rounded-xl"
          >
            <div className="bg-[#3C3E44] h-full w-5 border-s-black border-3 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-1 h-full">
        <div
          className="relative 
          h-auto w-64
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
        <div
          className="ml-5 px-5 flex flex-col w-full bg-(--semi-highlight) 
          border-2 border-s-black rounded-xl"
        >
          <div>
            <h3 className="text-xl">{project.name}</h3>
            <p>
              <span>{formatedStartAt}</span>
              <span> - </span>
              <span>{formatedEndAt}</span>
            </p>
          </div>
          <p className="text-xl">
            <span className="font-medium">Technologies</span>
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
        <button
          className="ml-auto flex flex-col justify-center"
          style={{ border: 0, padding: 0 }}
        >
          <Image
            src="/images/LeftRedArrow.png"
            alt="Arrow"
            width={80}
            height={80}
            className="rotate-180"
          />
        </button>
      </div>
      <div
        className="w-4 h-4
        bg-[#26272C]
        rounded-md absolute bottom-6 left-[2px]
        border-2 border-s-black"
      ></div>
    </AnimateSection>
  );
};
