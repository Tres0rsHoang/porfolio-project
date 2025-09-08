"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styles from "./comments_sections.module.css";
import { CommentFrame } from "./comment_frame";
import EmptyComment from "./empty_comment";
import { Role } from "@/models/user.model";
import { LoadingDonuts } from "../loading/loading_more";
import { useUserStore } from "@/store/user.store";
import { useSocket } from "@/store/socket.store";
import useFetchComments, {
  formatRawComment,
  PageComment,
  RawComment,
} from "@/hooks/useFetchComments";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import AddCommentButton from "./add_comment_button";

export default function CommentSection() {
  const queryClient = useQueryClient();
  const {
    data: comments,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useFetchComments();
  useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();
  const { connect, disconnect, socket } = useSocket();
  const { t } = useTranslation(["home", "common"]);

  const updateComment = useCallback(
    (rawComments: RawComment[]) => {
      queryClient.setQueryData<{ pages: PageComment[] }>(
        ["comments"],
        (oldData) => {
          if (!oldData) return oldData;
          const newPages = oldData.pages.map((page) => {
            const newComments = page.comments.map((comment) => {
              const raw = rawComments.find(
                (rawComment) => rawComment.id == comment.id,
              );
              return raw ? formatRawComment(raw) : comment;
            });
            return { ...page, comments: newComments };
          });
          return { ...oldData, pages: newPages };
        },
      );
    },
    [queryClient],
  );

  useEffect(() => {
    connect();
    socket?.on("newComment", (value: RawComment) => {
      updateComment([value]);
    });

    socket?.on("updatedComment", (value) => {
      if (!value["updatedComment"]) return;
      const updatedComments: RawComment[] = value[
        "updatedComment"
      ] as RawComment[];
      updateComment(updatedComments);
    });

    socket?.on("deletedComment", (commentId) => {
      if (!commentId) return;

      queryClient.setQueryData<{ pages: PageComment[] }>(
        ["comments"],
        (oldData) => {
          if (!oldData) return oldData;
          const newPages = oldData.pages.map((page) => {
            const newComments = page.comments.filter(
              (value) => value.id != commentId,
            );
            return { ...page, comments: newComments };
          });
          return { ...oldData, pages: newPages };
        },
      );
    });
    return () => {
      disconnect();
    };
  }, [connect, disconnect, socket, queryClient, updateComment]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <Fragment>
      <div className={styles.commentSectionContainer}>
        <div className="flex justify-between items-center">
          <h2>{t("comments_title")}</h2>
          {user?.role !== Role.ADMIN && <AddCommentButton />}
        </div>
        <div id="comment-list" className="h-96 w-full overflow-y-auto">
          {!comments || comments.pages[0].comments.length == 0 ? (
            <div className="mt-4">
              <EmptyComment />
            </div>
          ) : (
            <AnimatePresence>
              {(comments.pages.flatMap((page) => page.comments) ?? []).map(
                (comment) => (
                  <CommentFrame
                    comment={comment}
                    key={comment.id}
                    isRight={comment.parentId != undefined}
                    isOwner={
                      user != null &&
                      comment.user.id != null &&
                      comment.user.id == user.id
                    }
                  />
                ),
              )}
            </AnimatePresence>
          )}
          <div className="flex flex-row justify-center items-center">
            <LoadingDonuts isShow={isFetching} />
          </div>
          <div ref={loadMoreRef}></div>
        </div>
      </div>
    </Fragment>
  );
}
