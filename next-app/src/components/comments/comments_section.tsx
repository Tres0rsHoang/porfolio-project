"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styles from "./comments_sections.module.css";
import { Comment } from "@/models/comment.model";
import { CommentFrame } from "./comment_frame";
import EmptyComment from "./empty_comment";
import { DialogFrame } from "../dialog/dialog_frame";
import AnonymousNewCommentForm from "./anonymous_new_comment.form";
import { useAuthStore } from "@/store/auth.store";
import { Role, User } from "@/models/user.model";
import { LoadingDonuts } from "../loading/loading_more";
import { useUserStore } from "@/store/user.store";
import { useSocket } from "@/store/socket.store";
import RegisterForm, { RegisterFormData } from "../login_info/register.form";
import { NewCommentForm } from "./new_comment.form";
import useFetchComments, { PageComment } from "@/hooks/useFetchComments";
import { useQueryClient } from "@tanstack/react-query";
import useSendNewComment, { NewComment } from "@/hooks/useSendNewComment";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  const sendNewCommentQuery = useSendNewComment();

  const [showNewUserCommentDialog, setShowNewUserCommentDialog] =
    useState<boolean>(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState<boolean>(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState<boolean>(false);
  const [showNewCommentDialog, setShowNewCommentDialog] =
    useState<boolean>(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { accessToken } = useAuthStore();
  const { user, setUser } = useUserStore();
  const { connect, disconnect, socket } = useSocket();
  const newComment = useRef<NewComment | null>(null);
  const { t } = useTranslation("home");

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
  const handleNewComment = () => {
    if (accessToken == null) setShowNewUserCommentDialog(true);
    else setShowNewCommentDialog(true);
  };
  const onNewUserSubmitComment = (data: NewComment) => {
    setShowNewUserDialog(true);
    newComment.current = data;
  };
  const scrollToTop = () => {
    const container = document.querySelector("#comment-list");
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const handleCreateAccountRequest = async (accept: boolean) => {
    if (!newComment.current) return;
    if (!accept) {
      sendNewCommentQuery.mutate({
        newComment: newComment.current,
        onSuccess: () => {
          scrollToTop();
        },
      });
      setShowNewUserCommentDialog(false);
    } else {
      setShowRegisterDialog(true);
    }
    setShowNewUserDialog(false);
  };
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
          <h2>What people say about me...</h2>
          {user?.role !== Role.ADMIN && (
            <button
              onClick={handleNewComment}
              className={`${styles.addComment} px-4 rounded-lg`}
            >
              <h3>{t("new_comment")}</h3>
            </button>
          )}
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
      <DialogFrame
        title={t("new_comment")}
        isOpen={showNewUserCommentDialog}
        onClose={() => setShowNewUserCommentDialog(false)}
      >
        <AnonymousNewCommentForm
          user={user}
          onSubmit={onNewUserSubmitComment}
        />
      </DialogFrame>
      <DialogFrame
        title={t("create_account")}
        isOpen={showNewUserDialog}
        onClose={() => setShowNewUserDialog(false)}
      >
        <h3>{t("create_account_description")}</h3>
        <div className="flex flex-row justify-end">
          <button
            onClick={() => handleCreateAccountRequest(true)}
            className="bg-(--highlight) mr-2 w-20"
          >
            <p>{t("yes")}</p>
          </button>
          <button
            onClick={() => handleCreateAccountRequest(false)}
            className="bg-(--semi-highlight) w-20"
          >
            <p>{t("no")}</p>
          </button>
        </div>
      </DialogFrame>
      <DialogFrame
        title={t("Register")}
        isOpen={showRegisterDialog}
        onClose={() => setShowRegisterDialog(false)}
        style={{
          minWidth: "500px",
          maxWidth: "500px",
        }}
      >
        <RegisterForm
          name={newComment.current?.user.name}
          company={newComment.current?.user.company}
          gender={newComment.current?.user.gender}
          closeDialog={() => setShowRegisterDialog(false)}
          onRegisterSuccess={async (data: RegisterFormData, userId: number) => {
            const currentUser: User = {
              name: data.name,
              company: data.company,
              gender: data.gender == "male",
              id: userId,
              role: Role.USER,
            };
            setUser(currentUser);
            setShowNewCommentDialog(false);
            setShowNewUserCommentDialog(false);
            newComment.current = {
              content: newComment.current?.content ?? "",
              user: currentUser,
            };
            sendNewCommentQuery.mutate({
              newComment: newComment.current,
              onSuccess: () => {
                scrollToTop();
              },
            });
          }}
        />
      </DialogFrame>
      <DialogFrame
        isOpen={showNewCommentDialog}
        title={t("new_comment")}
        onClose={() => setShowNewCommentDialog(false)}
      >
        <NewCommentForm
          onSubmit={async (content: string) => {
            if (!user) return;
            newComment.current = {
              user: user,
              content: content,
            };
            scrollToTop();
            setShowNewCommentDialog(false);
          }}
        />
      </DialogFrame>
    </Fragment>
  );
}
