import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface LoadingProps {
  isShow: boolean;
}

export const Loading = ({ isShow = false }: LoadingProps) => {
  if (!isShow) return;
  return (
    <AnimatePresence>
      <div className="bg-(--loading-background) absolute w-full h-full top-0 left-0 flex justify-center items-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/images/donut.png"
            alt="donut_loading"
            width={200}
            height={200}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
