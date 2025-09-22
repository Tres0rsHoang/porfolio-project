import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimateSectionProps {
  id?: string;
  root?: Element;
  className?: string;
  children?: ReactNode;
}
export default function AnimateSection(props: AnimateSectionProps) {
  const sectionMotion: Variants = {
    hidden: {
      x: "100%",
    },
    show: {
      x: "0",
    },
  };

  return (
    <motion.section
      variants={sectionMotion}
      initial="hidden"
      whileInView="show"
      exit="hidden"
      transition={{ duration: 0.3 }}
      viewport={{
        root: { current: props.root ? props.root : null },
        once: true,
      }}
      className={props.className}
      id={props.id}
    >
      {props.children}
    </motion.section>
  );
}
