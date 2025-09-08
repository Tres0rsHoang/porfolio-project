"use client";

import useFetchComments from "@/hooks/useFetchComments";
import { AnimatePresence } from "framer-motion";
import { FloadingCommentItem } from "./floading_comment_item";
import dynamic from "next/dynamic";
import { Loading } from "../loading/loading_full";

export const LazyFloadingComments = dynamic(
  () => import("./floading_comments"),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default function FloadingComments() {
  const { data: comments } = useFetchComments();

  return (
    <AnimatePresence>
      <div className="absolute h-dvh w-dvw overflow-hidden">
        {(comments?.pages.flatMap((page) => page.comments) ?? []).map(
          (comment) => (
            <FloadingCommentItem comment={comment} key={comment.id} />
          ),
        )}
      </div>
    </AnimatePresence>
  );
}
