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
import { useForm } from "react-hook-form";
import { TextAreaField } from "../form/text_area.field";
import { NotificationType, useNotication } from "@/store/notification.store";
import { Role } from "@/models/user.model";

type CommentFrameProps = {
  comment: Comment;
  isRight?: boolean;
  isOwner?: boolean;
};

interface EditFormData {
  newContent: string;
}

export const CommentFrame = ({
  comment,
  isRight = true,
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
  const [expandContent, setExpandContent] = useState<boolean>(false);
  const { user } = useUserStore();
  const { accessToken } = useAuthStore();
  const [showEditComment, setShowEditComment] = useState<boolean>(false);
  const [showDeleteComment, setShowDeleteComment] = useState<boolean>(false);
  const { addNotification } = useNotication();

  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
  } = useForm<EditFormData>({
    defaultValues: {
      newContent: comment.content,
    },
  });

  const onEditComment = async (data: EditFormData) => {
    const res = await authFetch(`/comment/${comment.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        content: data.newContent,
      }),
    });
    if (res.status == 200) {
      addNotification(
        "Comment refreshed — smoother than Marge’s blue hair.",
        NotificationType.SUCCESS,
      );
    }
  };

  const onDeleteComment = async () => {
    const res = await authFetch(`/comment/${comment.id}`, {
      method: "DELETE",
    });
    if (res.status == 200) {
      addNotification(
        "Poof! Your comment disappeared like Bart’s homework.",
        NotificationType.SUCCESS,
      );
    }
    setShowDeleteComment(false);
  };

  const ContentSection = () => {
    return (
      <p>
        <span>
          &quot;
          {expandContent ? comment.content : comment.content.slice(0, 100)}
          {comment.content.length > 100 && (
            <span>
              ...
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

  if (isRight) {
    return (
      <div className="relative pb-5 pr-16 flex flex-row justify-end">
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
        >
          <div className="text-end whitespace-pre-line">
            <ContentSection />
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
          />
        </div>
      </div>
    );
  }

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
        >
          <div className="text-start whitespace-pre-line">
            <ContentSection />
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
        {((isOwner && accessToken != null) || user?.role == Role.ADMIN) && (
          <div className="flex flex-row justify-center items-center">
            <motion.button
              onClick={() => setShowEditComment(true)}
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
          </div>
        )}
        <div className="absolute -bottom-10 left-0">
          <Avatar
            name={comment.user.name}
            gender={comment.user.gender}
            size={125}
          />
        </div>
      </div>
      <DialogFrame
        title="Comment Editing"
        isOpen={showEditComment}
        onClose={() => setShowEditComment(false)}
      >
        <form onSubmit={editHandleSubmit(onEditComment)}>
          <TextAreaField<EditFormData>
            register={editRegister}
            name="newContent"
            placeholder="Input new content"
            error={editErrors.newContent}
            required="New content is required"
            className="w-[800px] h-[500px]"
          ></TextAreaField>
          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className="bg-(--highlight-button) mt-2"
              onClick={() => setShowEditComment(false)}
            >
              Send
            </button>
          </div>
        </form>
      </DialogFrame>
      <DialogFrame
        title="Comment Deleting"
        isOpen={showDeleteComment}
        onClose={() => setShowDeleteComment(false)}
      >
        <h3>Do you realy want to delete your comment?</h3>
        <div className="flex flex-row justify-end mt-3">
          <button
            onClick={() => onDeleteComment()}
            className="bg-(--semi-highlight) mr-2 w-20"
          >
            <p>Yes</p>
          </button>
          <button
            onClick={() => setShowDeleteComment(false)}
            className="bg-(--highlight) w-20"
          >
            <p>No</p>
          </button>
        </div>
      </DialogFrame>
    </Fragment>
  );
};
