"use client";

import useFetchComments from "@/hooks/useFetchComments";
import { AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { FloadingCommentItem } from "./floading_comment_item";

export default function FloadingComments() {
  const { data: comments } = useFetchComments();

  return (
    <AnimatePresence>
      <div className="absolute h-dvh w-dvw">
        {comments?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.comments.map((comment, index) => (
              <FloadingCommentItem comment={comment} key={index} />
            ))}
          </Fragment>
        ))}
      </div>
    </AnimatePresence>
  );
}
