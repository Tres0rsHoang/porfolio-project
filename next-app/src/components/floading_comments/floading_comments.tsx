"use client";

import useFetchComments from "@/hooks/useFetchComments";
import { AnimatePresence, motion } from "framer-motion";
import { FloadingCommentItem } from "./floading_comment_item";
import dynamic from "next/dynamic";
import { Loading } from "../loading/loading_full";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

export const LazyFloadingComments = dynamic(
  () => import("./floading_comments"),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default function FloadingComments() {
  const { data: comments } = useFetchComments();
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const commentList = comments?.pages.flatMap((page) => page.comments) ?? [];
  const items = [...commentList, ...commentList];
  const { width } = useWindowSize();

  useEffect(() => {
    if (!listRef.current) return;

    const rect = listRef.current.getBoundingClientRect();
    setScrollHeight(rect.height / 2);
  }, [setScrollHeight, width]);

  return (
    <AnimatePresence>
      <motion.div
        ref={listRef}
        initial={{ y: 0 }}
        animate={{
          y: -scrollHeight,
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute w-dvw flex justify-center items-center flex-col gap-4"
      >
        {items.map((comment, index) => (
          <FloadingCommentItem comment={comment} key={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
