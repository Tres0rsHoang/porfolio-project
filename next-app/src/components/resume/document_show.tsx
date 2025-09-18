"use client";

import { CVFrame } from "@/components/resume/cv_frame";
import styles from "@/components/resume/resume.module.css";
import Image from "next/image";
import { useState } from "react";
import { BlobProvider, DocumentProps } from "@react-pdf/renderer";
import { AnimatePresence, motion } from "framer-motion";
import WebFullstackDoc from "./cvs/web_fullstack_doc";
import { Loading } from "../loading/loading_full";
import WebFullstackPythonDoc from "./cvs/web_fullstack_python_doc";
import MobileFullstackDoc from "./cvs/mobile_fullstack_doc";
import FullstackDoc from "./cvs/fullstack_dev_doc";

interface CVItem {
  title: string;
  imagePath: string;
  document?: React.ReactElement<DocumentProps>;
}

export function DocumentShow() {
  const [contentChildren, setContentChildren] = useState<
    React.ReactElement<DocumentProps> | undefined
  >(undefined);

  const CVItems: Array<CVItem> = [
    {
      imagePath: "/images/WebJobTitleIcon.png",
      title: "Fullstack Web Developer",
      document: <WebFullstackDoc />,
    },
    {
      imagePath: "/images/WebJobTitleIcon.png",
      title: "Fullstack Web Developer (Python)",
      document: <WebFullstackPythonDoc />,
    },
    {
      imagePath: "/images/PhoneCVIcon.png",
      title: "Fullstack Mobile Developer",
      document: <MobileFullstackDoc />,
    },
    {
      imagePath: "/images/System.png",
      title: "Fullstack Developer",
      document: <FullstackDoc />,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/images/UpperScreen.png"
          alt="UpperScreen"
          width={800}
          height={100}
        ></Image>
        <AnimatePresence>
          {contentChildren && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "fit-content",
              }}
              exit={{
                height: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="border-x-5 bg-[#FCC41B] overflow-hidden"
            >
              <div className="relative w-[695px] h-[570px] bg-[#FFF] mx-6 border-x-5 flex flex-col items-center justify-center">
                <BlobProvider document={contentChildren} key={Date.now()}>
                  {({ url, loading, error }) => {
                    if (loading) return <Loading />;
                    if (error) return <div>Error: {error.message}</div>;
                    if (!url) return null;
                    return (
                      <iframe
                        src={`${url}`}
                        height="100%"
                        width="100%"
                        style={{
                          border: "none",
                        }}
                      />
                    );
                  }}
                </BlobProvider>
                <button
                  className="absolute bottom-5 right-5 bg-(--red) px-3 flex justify-center items-center rounded-lg border-solid border-[2px] w-10 h-10"
                  onClick={() => setContentChildren(undefined)}
                >
                  x
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Image
          src="/images/LowerScreen.png"
          alt="UpperScreen"
          width={800}
          height={100}
        ></Image>
      </div>
      <ul id={styles.CVItems}>
        {CVItems.map((item, index) => (
          <li key={index}>
            <CVFrame
              imagePath={item.imagePath}
              title={item.title}
              onClick={() => setContentChildren(item.document)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
