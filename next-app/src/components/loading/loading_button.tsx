"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface LoadingButtonProps {
  isLoading: boolean;
  label?: string;

  children?: React.ReactNode;
  onClick?: () => void;
  type?: string;
  className?: string;
}

export const LoadingButton = (props: LoadingButtonProps) => {
  return (
    <button
      type="submit"
      className={
        (props.className ?? "bg-(--highlight)") +
        (props.isLoading ? " opacity-50" : " opacity-100")
      }
      disabled={props.isLoading}
      onClick={props.onClick}
      style={{
        overflow: "hidden",
        minWidth: "2.9rem",
        minHeight: "2.7rem",
      }}
    >
      {props.isLoading ? (
        <AnimatePresence>
          <motion.div
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="max-h-10 min-h-10"
          >
            <Image
              src="/images/donut.png"
              alt="loading_donut"
              width={55}
              height={55}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        (props.children ?? <h3>{props.label}</h3>)
      )}
    </button>
  );
};
