"use client";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./about_me.module.css";
import Image from "next/image";
import { useState } from "react";
import ExpandDetail from "./expand_detail";

interface SubItemFrameProps {
  title: string;
  titleImagePath: string;
  subtitle?: React.ReactNode;
  shortDescription: string[];
  period: string;
  background?: string;
  children?: React.ReactNode;
  className?: string;
}
export const SubItemFrame = (props: SubItemFrameProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className={props.className}>
      <AnimatePresence>
        <motion.div
          initial={{
            x: -1000,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center justify-between flex-row">
            <p
              className={styles.verticalTimeText}
              style={{
                fontSize: "2rem",
              }}
            >
              {props.period}
            </p>
            <div
              className={`flex-row justify-between flex items-center ${props.background ?? "bg-(--highlight)"} p-2 pl-5 rounded-3xl rounded-l-none border-3 border-solid border-black`}
            >
              <div className="object-fill overflow-hidden rounded-2xl mr-5 bg-(--highlight-4)">
                <Image
                  src={props.titleImagePath}
                  alt={props.titleImagePath}
                  height={200}
                  width={200}
                />
              </div>
              <div className="w-11/12">
                <h3
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  {props.title}
                </h3>
                <h3>{props.subtitle}</h3>
                <hr className="border-1 border-solid border-(--foreground) mb-2 mt-1" />
                <ul className="list-disc pl-4 mt-2">
                  {props.shortDescription.map((job, index) => (
                    <li key={index} className={styles.jobDetail}>
                      {job}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {props.children && (
            <div className="ml-5">
              <ExpandDetail
                className="border-3 border-t-0 rounded-b-2xl bg-(--green)"
                isExpand={expanded}
              >
                {props.children}
              </ExpandDetail>
              <div className="flex justify-end pr-12">
                <button
                  className="bg-(--gray) flex justify-center items-center"
                  onClick={() => setExpanded((prev) => !prev)}
                  style={{
                    width: "10px",
                    paddingBlock: "8px",
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderTop: "none",
                    borderWidth: "2px",
                  }}
                >
                  <div
                    className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent ${!expanded ? "border-t-[10px] border-t-white" : "border-b-[10px] border-b-white"}`}
                  ></div>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
