"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styles from "./comments_sections.module.css";
import { Comment } from "@/models/comment.model";
import { CommentFrame } from "./comment_frame";
import EmptyComment from "./empty_comment";
import { Role } from "@/models/user.model";
import { LoadingDonuts } from "../loading/loading_more";
import { useUserStore } from "@/store/user.store";
import { useSocket } from "@/store/socket.store";
import useFetchComments, { PageComment } from "@/hooks/useFetchComments";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import AddCommentButton from "./add_comment_button";

export interface RawComment {
  user: {
    id: number;
    name: string;
    company: string;
    gender: boolean;
  };
  id: number;
  createAt: string;
  content: string;
}

export const formatRawComment = (value: RawComment) => {
  const commentInfo: Comment = {
    id: +value.id,
    content: value.content,
    createdDate: new Date(value.createAt),
    user: {
      id: value.user.id,
      name: value.user.name,
      company: value.user.company,
      gender: value.user.gender,
    },
  };
  return commentInfo;
};

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

  const addNewCommentToState = useCallback(
    (newComment: Comment) => {
      for (const page of comments?.pages ?? []) {
        for (const comment of page.comments) {
          if (comment.id == newComment.id) return;
        }
      }
      queryClient.setQueryData<{ pages: PageComment[] }>(
        ["comments"],
        (oldData) => {
          if (!oldData) {
            return { pages: [{ comments: [newComment], nextPage: 2 }] };
          }
          return {
            ...oldData,
            pages: [
              {
                ...oldData.pages[0],
                comments: [newComment, ...oldData.pages[0].comments],
              },
              ...oldData.pages.slice(0),
            ],
          };
        },
      );
    },
    [comments?.pages, queryClient],
  );

  useEffect(() => {
    connect();
    socket?.on("newComment", (value) => {
      const comment: Comment = formatRawComment(value);
      addNewCommentToState(comment);
    });

    socket?.on("updatedComment", (value) => {
      if (!value["updatedComment"]) return;

      const updatedComments: RawComment[] = value[
        "updatedComment"
      ] as RawComment[];

      queryClient.setQueryData<{ pages: PageComment[] }>(
        ["comments"],
        (oldData) => {
          const updateData = oldData;
          for (const rawComment of updatedComments) {
            for (const page of updateData?.pages ?? []) {
              for (const index in page.comments) {
                if (page.comments[index].id == rawComment.id) {
                  page.comments[index] = formatRawComment(rawComment);
                  break;
                }
              }
            }
          }
          return updateData;
        },
      );
    });

    socket?.on("deletedComment", (commentId) => {
      if (!commentId) return;
      queryClient.setQueryData<{ pages: PageComment[] }>(
        ["comments"],
        (oldData) => {
          const updateData = oldData;
          for (const page of updateData?.pages ?? []) {
            page.comments = page.comments.filter(
              (value) => value.id != commentId,
            );
          }
          return updateData;
        },
      );
    });
    return () => {
      disconnect();
    };
  }, [connect, disconnect, socket, addNewCommentToState, queryClient]);

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
              {comments.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                  {page.comments.map((comment, index) => (
                    <CommentFrame
                      comment={comment}
                      key={index}
                      isRight={comment.parentId != undefined}
                      isOwner={
                        user != null &&
                        comment.user.id != null &&
                        comment.user.id == user.id
                      }
                    />
                  ))}
                </Fragment>
              ))}
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
