"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styles from "./comments_sections.module.css";
import { Comment } from "@/models/comment.model";
import { CommentFrame } from "./comment_frame";
import EmptyComment from "./empty_comment";
import { Paging } from "@/models/paging.model";
import { DialogFrame } from "../dialog/dialog_frame";
import AnonymousNewCommentForm from "./anonymous_new_comment.form";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useAuthStore } from "@/store/auth.store";
import { Role, User } from "@/models/user.model";
import { LoadingDonuts } from "../loading/loading_more";
import { Loading } from "../loading/loading_full";
import { useUserStore } from "@/store/user.store";
import { useSocket } from "@/store/socket.store";
import RegisterForm, { RegisterFormData } from "../login_info/register.form";
import { NewCommentForm } from "./new_comment.form";

export interface NewComment {
  user: User;
  content: string;
}

interface RawComment {
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

export default function CommentSection() {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newCommentData, setNewCommentData] = useState<NewComment | null>(null);

  const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const [showNewUserCommentDialog, setShowNewUserCommentDialog] =
    useState<boolean>(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState<boolean>(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState<boolean>(false);
  const [showNewCommentDialog, setShowNewCommentDialog] =
    useState<boolean>(false);

  const isSubmittingRef = useRef<boolean>(false);
  const isFetchCommentRef = useRef<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { accessToken } = useAuthStore();
  const { addNotification } = useNotication();
  const { user, setUser, setCommented } = useUserStore();
  const { connect, disconnect, socket } = useSocket();

  const formatRawComment = (value: RawComment) => {
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

  const addNewCommentToState = useCallback(
    (newComment: Comment) => {
      for (const comment of comments) {
        if (comment.id == newComment.id) return;
      }
      setComments((pre) => [newComment, ...pre]);
    },
    [comments],
  );

  const handleNewComment = () => {
    if (accessToken == null) setShowNewUserCommentDialog(true);
    else setShowNewCommentDialog(true);
  };

  const onNewUserSubmitComment = (data: NewComment) => {
    setShowNewUserDialog(true);
    setNewCommentData(data);
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

  const sendNewComment = async (userId?: number): Promise<boolean> => {
    if (!newCommentData || isSubmittingRef.current) return false;

    isSubmittingRef.current = true;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            name: newCommentData?.user.name,
            company: newCommentData?.user.company,
            content: newCommentData?.content,
            gender: newCommentData?.user.gender,
          }),
        },
      );

      if (res.status === 201) {
        setCommented(true);
        const resData = await res.json();
        const currentUser: User = {
          name: resData.user.name,
          company: resData.user.company,
          gender: resData.user.gender,
          id: resData.user.id,
          role: Role.USER,
        };
        setUser(currentUser);
      }
      return res.status === 201;
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleCreateAccountRequest = async (value: boolean) => {
    if (!value) {
      const sendResult = await sendNewComment();
      if (sendResult) {
        addNotification(
          "Thank for a new comment. <3 <3",
          NotificationType.SUCCESS,
        );
      }
      setShowNewUserCommentDialog(false);
      scrollToTop();
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

      const updatedCommentsState = comments;
      for (const rawComment of updatedComments) {
        const existIndex: number | null = comments.findIndex(
          (value) => value.id == +rawComment.id,
        );
        if (existIndex == -1) continue;
        updatedCommentsState[existIndex] = formatRawComment(rawComment);
      }
      setComments(updatedCommentsState);
    });
    socket?.on("deletedComment", (commentId) => {
      setComments((pre) => pre.filter((value) => value.id != commentId));
    });

    return () => {
      disconnect();
    };
  }, [connect, disconnect, socket, addNewCommentToState, comments]);

  useEffect(() => {
    const fetchComment = async () => {
      setLoadingMore(true);
      isFetchCommentRef.current = true;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment?page=${page}`,
        );
        const resBody = await res.json();
        const data = resBody.data;
        const paging: Paging = resBody.paging as Paging;
        if (!paging || page >= paging.totalPage) {
          setHasMore(false);
        }
        if (!Array.isArray(data)) {
          throw new Error("Invalid /api/comment responsive");
        }
        const formatedComments: Comment[] = data.map((value) => {
          return formatRawComment(value);
        });
        setComments((prev) => [...prev, ...formatedComments]);
      } catch (err) {
        console.log(err);
      } finally {
        isFetchCommentRef.current = false;
        setLoadingMore(false);
        setLoading(false);
      }
    };
    if (!isFetchCommentRef.current && hasMore) fetchComment();
  }, [page, hasMore]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isLoadingMore, hasMore]);

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
              <h3>New comment</h3>
            </button>
          )}
        </div>
        <div id="comment-list" className="h-96 w-full overflow-y-auto">
          {comments.length != 0 || isLoadingMore ? (
            comments.map((comment, i) => {
              return (
                <CommentFrame
                  comment={comment}
                  key={i}
                  isRight={comment.parentId != undefined}
                  isOwner={
                    user != null &&
                    comment.user.id != null &&
                    comment.user.id == user.id
                  }
                />
              );
            })
          ) : (
            <div className="mt-4">
              <EmptyComment />
            </div>
          )}
          <div className="flex flex-row justify-center items-center">
            <LoadingDonuts isShow={isLoadingMore} />
          </div>
          <div ref={loadMoreRef}></div>
        </div>
        <Loading isShow={isLoading}></Loading>
      </div>
      <DialogFrame
        title="New Comment"
        isOpen={showNewUserCommentDialog}
        onClose={() => setShowNewUserCommentDialog(false)}
      >
        <AnonymousNewCommentForm
          user={user}
          onSubmit={onNewUserSubmitComment}
        />
      </DialogFrame>
      <DialogFrame
        title="Wanna create an account?"
        isOpen={showNewUserDialog}
        onClose={() => setShowNewUserDialog(false)}
      >
        <h3>
          Do you want to sign up and get updates (new posts, replies, LeetCode
          goodies) while also editing, replying, or nuking your comments—kinda
          like cleaning up Homer’s donut mess?
        </h3>
        <div className="flex flex-row justify-end">
          <button
            onClick={() => handleCreateAccountRequest(true)}
            className="bg-(--highlight) mr-2 w-20"
          >
            <p>Yes</p>
          </button>
          <button
            onClick={() => handleCreateAccountRequest(false)}
            className="bg-(--semi-highlight) w-20"
          >
            <p>No</p>
          </button>
        </div>
      </DialogFrame>
      <DialogFrame
        title="Register"
        isOpen={showRegisterDialog}
        onClose={() => setShowRegisterDialog(false)}
        style={{
          minWidth: "500px",
          maxWidth: "500px",
        }}
      >
        <RegisterForm
          name={newCommentData?.user.name}
          company={newCommentData?.user.company}
          gender={newCommentData?.user.gender}
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
            if (!user) return;
            const newComment: NewComment = {
              user: currentUser,
              content: newCommentData?.content ?? "",
            };
            setNewCommentData(newComment);
            const sendResult = await sendNewComment(userId);
            if (sendResult) {
              addNotification(
                "Thank for a new comment. <3 <3",
                NotificationType.SUCCESS,
              );
            }
            scrollToTop();
          }}
        />
      </DialogFrame>
      <DialogFrame
        isOpen={showNewCommentDialog}
        title="New Comment"
        onClose={() => setShowNewCommentDialog(false)}
      >
        <NewCommentForm
          onSubmit={async (content: string) => {
            setShowNewCommentDialog(false);
            if (!user) return;
            const newComment: NewComment = {
              user: user,
              content: content,
            };
            setNewCommentData(newComment);
            const sendResult = await sendNewComment();
            if (sendResult) {
              addNotification(
                "Thank for a new comment. <3 <3",
                NotificationType.SUCCESS,
              );
            }
            scrollToTop();
          }}
        />
      </DialogFrame>
    </Fragment>
  );
}
