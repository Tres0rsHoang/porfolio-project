"use client";
import { Comment } from "@/models/comment.model";
import styles from "./comments_sections.module.css";
import Image from "next/image";
import Avatar from "../avatars/avatar";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";
import { authFetch } from "@/helpers/authFetch";
import { DialogFrame } from "../dialog/dialog_frame";
import { NotificationType, useNotication } from "@/store/notification.store";
import { Role } from "@/models/user.model";
import { useQueryClient } from "@tanstack/react-query";
import { PageComment } from "@/hooks/useFetchComments";
import { useTranslation } from "react-i18next";
import { ReplyCommentForm, ReplyCommentFormData } from "./reply_comment.form";
import { RepliedComment } from "./replied_comment";
import useEditComment from "@/hooks/useEditComment";
import useDeleteComment from "@/hooks/useDeleteComment";
import { EditCommentForm, EditCommentFormData } from "./edit_comment.form";

type CommentFrameProps = {
  pending?: boolean;
  comment: Comment;
  isOwner?: boolean;
};

export const ContentSection = ({ content }: { content: string }) => {
  const [expandContent, setExpandContent] = useState<boolean>(false);
  return (
    <p>
      <span>
        &quot;
        {expandContent ? content : content.slice(0, 100)}
        {content.length > 100 && (
          <span>
            {!expandContent ? <span>...</span> : <span> </span>}
            <button
              style={{
                border: "none",
                fontSize: "1.2rem",
                padding: 0,
                margin: 0,
                color: "var(--red)",
              }}
              onClick={() => {
                setExpandContent(!expandContent);
              }}
            >
              {!expandContent ? "show more" : "hide"}
            </button>
          </span>
        )}
        &quot;
      </span>
    </p>
  );
};

export const CommentFrame = ({
  comment,
  pending = false,
  isOwner = false,
}: CommentFrameProps) => {
  const formattedDate = comment.createdDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const { user } = useUserStore();
  const { accessToken } = useAuthStore();
  const [showEditComment, setShowEditComment] = useState<boolean>(false);
  const [showDeleteComment, setShowDeleteComment] = useState<boolean>(false);
  const [showReplyComment, setShowReplyComment] = useState<boolean>(false);

  const { t } = useTranslation(["home", "common"]);
  const { addNotification } = useNotication();
  const editCommentQuery = useEditComment();
  const deleteCommentQuery = useDeleteComment();

  const queryClient = useQueryClient();

  const pendingComment = (id: number, content?: string) => {
    queryClient.setQueryData<{ pages: PageComment[] }>(
      ["comments"],
      (oldData) => {
        if (!oldData) return oldData;
        const newPages = oldData.pages.map((page) => {
          const newComments = page.comments.map((c) => {
            if (comment.id == id) {
              c.pending = true;
              if (content) c.content = content;
            }
            return c;
          });
          return { ...page, comments: newComments };
        });
        return { ...oldData, pages: newPages };
      },
    );
  };

  const onEditComment = async (data: EditCommentFormData) => {
    editCommentQuery.mutate(
      {
        commentId: comment.id,
        newContent: data.newContent,
      },
      {
        onSuccess: () => {
          pendingComment(comment.id);
          setShowEditComment(false);
        },
      },
    );
  };

  const onDeleteComment = async () => {
    deleteCommentQuery.mutate(
      { commentId: comment.id },
      {
        onSuccess: () => {
          pendingComment(comment.id);
          setShowDeleteComment(false);
        },
      },
    );
  };

  const onRelyComment = async (data: ReplyCommentFormData) => {
    setShowReplyComment(false);
    try {
      const res = await authFetch(`/comment/${comment.id}`, {
        method: "POST",
        body: JSON.stringify({
          content: data.content,
        }),
      });

      if (!res.ok) {
        throw new Error(`Got error when reply comment`);
      }

      pendingComment(comment.id);
      addNotification(
        `Replied ${comment.user.name}'s comment successfully`,
        NotificationType.SUCCESS,
      );
    } catch (err) {
      console.log(err);
      addNotification(`Got error when reply comment`, NotificationType.ERROR);
    }
  };

  return (
    <Fragment>
      <div className="relative pb-5 pl-16 flex flex-row justify-start">
        <motion.div
          key="comment-box"
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: pending ? 0.3 : 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 80,
          }}
          transition={{
            duration: 1,
          }}
          className={`${styles.commentBox}`}
        >
          <div className="text-start whitespace-pre-line">
            <ContentSection content={comment.content} />
          </div>
          <h3 className="text-end">{comment.user.name}</h3>
          {comment.user.company && (
            <h4 className="text-end">{comment.user.company}</h4>
          )}
          <div className="text-end pl-7">{formattedDate}</div>
          <div className="absolute -bottom-[28px] left-16">
            <Image
              alt="right-tail"
              src="/images/RightCommentTail.png"
              width={32}
              height={32}
              className="scale-x-[-1]"
            />
          </div>
        </motion.div>
        <div className="flex flex-row justify-center items-center">
          {((isOwner && accessToken != null) || user?.role == Role.ADMIN) && (
            <Fragment>
              <motion.button
                onClick={() => {
                  setShowEditComment(true);
                }}
                className="flex flex-row ml-10 w-10"
                style={{
                  opacity: "40%",
                  border: "none",
                  padding: "0",
                }}
                whileHover={{
                  opacity: "100%",
                }}
              >
                <Image
                  src="/images/PenIcon.png"
                  alt="pen"
                  width={30}
                  height={30}
                />
              </motion.button>
              <motion.button
                onClick={() => setShowDeleteComment(true)}
                className="flex flex-row ml-5 w-10"
                style={{
                  opacity: "40%",
                  borderRadius: "100px",
                  border: "none",
                  padding: "0",
                }}
                whileHover={{
                  opacity: "100%",
                }}
              >
                <Image
                  src="/images/TrashCanIcon.png"
                  alt="pen"
                  width={30}
                  height={30}
                />
              </motion.button>
            </Fragment>
          )}
          {user?.role == Role.ADMIN && (
            <motion.button
              onClick={() => {
                setShowReplyComment(true);
              }}
              className="flex flex-row ml-5 w-10"
              style={{
                opacity: "40%",
                border: "none",
                padding: "0",
              }}
              whileHover={{
                opacity: "100%",
              }}
            >
              <Image
                src="/images/ReplyIcon.png"
                alt="pen"
                width={30}
                height={30}
              />
            </motion.button>
          )}
        </div>
        <div className="absolute -bottom-10 left-0">
          <Avatar
            name={comment.user.name}
            gender={comment.user.gender}
            size={125}
          />
        </div>
      </div>
      {comment.replies.map((repliedComment) => (
        <RepliedComment comment={repliedComment} key={repliedComment.id} />
      ))}
      <DialogFrame
        title={t("Comment Editing")}
        isOpen={showEditComment}
        onClose={() => setShowEditComment(false)}
      >
        <EditCommentForm comment={comment} onEditComment={onEditComment} />
      </DialogFrame>
      <DialogFrame
        title={t("Comment Deleting")}
        isOpen={showDeleteComment}
        onClose={() => setShowDeleteComment(false)}
      >
        <h3>{t("Do you realy want to delete your comment?")}</h3>
        <div className="flex flex-row justify-end mt-3">
          <button
            onClick={() => onDeleteComment()}
            className="bg-(--semi-highlight) mr-2 w-20"
          >
            <p>{t("Yes", { ns: "common" })}</p>
          </button>
          <button
            onClick={() => setShowDeleteComment(false)}
            className="bg-(--highlight) min-w-20"
          >
            <p>{t("No", { ns: "common" })}</p>
          </button>
        </div>
      </DialogFrame>
      <DialogFrame
        title={t("Reply Comment")}
        isOpen={showReplyComment}
        onClose={() => setShowReplyComment(false)}
      >
        <ReplyCommentForm onSubmit={onRelyComment} />
      </DialogFrame>
    </Fragment>
  );
};
