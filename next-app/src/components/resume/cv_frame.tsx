"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./resume.module.css";

interface CVFrameProps {
  imagePath: string;
  title: string;
  onClick?: () => void;
}

export const CVFrame = (props: CVFrameProps) => {
  return (
    <AnimatePresence>
      <motion.div className={`flex flex-col items-center`}>
        <button
          onClick={props.onClick}
          className={`relative ${styles.CVFolderIcon}`}
        >
          <Image
            src="/images/FolderFrame.png"
            alt="FolderFrame"
            width={100}
            height={100}
          />
          <Image
            src={props.imagePath}
            alt="FolderIcon"
            width={35}
            height={35}
            className="absolute top-[60%] left-[50%] -translate-6/12"
          />
        </button>
        <h3 className="mt-2 text-center">{props.title}</h3>
      </motion.div>
    </AnimatePresence>
  );
};
