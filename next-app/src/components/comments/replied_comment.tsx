"use client";
import { Comment } from "@/models/comment.model";
import { motion } from "framer-motion";
import styles from "./comments_sections.module.css";
import { ContentSection } from "./comment_frame";
import Image from "next/image";
import Avatar from "../avatars/avatar";
import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";
import { Role } from "@/models/user.model";
import { Fragment, useState } from "react";
import { DialogFrame } from "../dialog/dialog_frame";
import { useTranslation } from "react-i18next";
import { EditCommentForm, EditCommentFormData } from "./edit_comment.form";
import useEditComment from "@/hooks/useEditComment";
import useDeleteComment from "@/hooks/useDeleteComment";

interface RepliedCommentProps {
  comment: Comment;
}
export const RepliedComment = ({ comment }: RepliedCommentProps) => {
  const formattedDate = comment.createdDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const { accessToken } = useAuthStore();
  const { user } = useUserStore();

  const [showEditComment, setShowEditComment] = useState<boolean>(false);
  const [showDeleteComment, setShowDeleteComment] = useState<boolean>(false);
  const { t } = useTranslation(["home", "common"]);

  const editCommentQuery = useEditComment();
  const deleteCommentQuery = useDeleteComment();

  const onEditComment = async (data: EditCommentFormData) => {
    editCommentQuery.mutate(
      {
        commentId: comment.id,
        newContent: data.newContent,
      },
      {
        onSuccess: () => {
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
          setShowDeleteComment(false);
        },
      },
    );
  };

  return (
    <Fragment>
      <div className="relative pb-5 pr-16 flex flex-row justify-end items-center">
        {((user && user.id == comment.user.id && accessToken != null) ||
          user?.role == Role.ADMIN) && (
          <Fragment>
            <motion.button
              onClick={() => setShowDeleteComment(true)}
              className="flex flex-row mr-5 w-10"
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
            <motion.button
              onClick={() => {
                setShowEditComment(true);
              }}
              className="flex flex-row mr-10 w-10"
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
          </Fragment>
        )}
        <motion.div
          key="comment-box"
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
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
          style={{
            backgroundColor: "#90ee90",
          }}
        >
          <div className="text-end whitespace-pre-line">
            <ContentSection content={comment.content} />
          </div>
          <h3>{comment.user.name}</h3>
          {comment.user.company && (
            <h4 className="text-start">{comment.user.company}</h4>
          )}
          <div className="text-start pr-7">{formattedDate}</div>
          <div className="absolute -bottom-[28px] right-16">
            <Image
              alt="right-tail"
              src="/images/RightCommentTail.png"
              width={32}
              height={32}
            />
          </div>
        </motion.div>
        <div className="absolute -bottom-10 right-0">
          <Avatar
            name={comment.user.name}
            gender={comment.user.gender}
            size={125}
            imagePath="/images/ProfilePic2.png"
          />
        </div>
      </div>
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
    </Fragment>
  );
};
