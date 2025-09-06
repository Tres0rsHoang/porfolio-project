"use client";

import { Fragment, useRef, useState } from "react";
import styles from "./comments_sections.module.css";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";
import { DialogFrame } from "../dialog/dialog_frame";
import AnonymousNewCommentForm from "./anonymous_new_comment.form";
import RegisterForm, { RegisterFormData } from "../login_info/register.form";
import { NewCommentForm } from "./new_comment.form";
import useSendNewComment, { NewComment } from "@/hooks/useSendNewComment";
import { Role, User } from "@/models/user.model";
import { useUserStore } from "@/store/user.store";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ClipboardPenLine } from "lucide-react";

export default function AddCommentButton() {
  const newComment = useRef<NewComment | null>(null);
  const { t } = useTranslation("home");
  const { accessToken } = useAuthStore();
  const [showNewUserDialog, setShowNewUserDialog] = useState<boolean>(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState<boolean>(false);
  const [showNewUserCommentDialog, setShowNewUserCommentDialog] =
    useState<boolean>(false);
  const [showNewCommentDialog, setShowNewCommentDialog] =
    useState<boolean>(false);
  const sendNewCommentQuery = useSendNewComment();
  const { user, setUser } = useUserStore();
  const { width } = useWindowSize();

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
  return (
    <Fragment>
      <button
        onClick={handleNewComment}
        className={`${styles.addComment} px-4 rounded-lg`}
      >
        {width && width < 1230 ? (
          <ClipboardPenLine />
        ) : (
          <h3>{t("new_comment")}</h3>
        )}
      </button>
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
        title={t("register")}
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
