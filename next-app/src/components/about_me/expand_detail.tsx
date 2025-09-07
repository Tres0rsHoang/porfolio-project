import { AnimatePresence, motion } from "framer-motion";
import styles from "./about_me.module.css";

interface ExpandDetailProps {
  children?: React.ReactNode;
  isExpand?: boolean;
  className?: string;
}
function ExpandDetail({
  children,
  isExpand = false,
  className,
}: ExpandDetailProps) {
  return (
    <AnimatePresence>
      {isExpand && (
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
            ease: "easeInOut",
          }}
          className={`${styles.moreAboutMeContent} ${className ?? "bg-(--highlight-background)"}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ExpandDetail;
