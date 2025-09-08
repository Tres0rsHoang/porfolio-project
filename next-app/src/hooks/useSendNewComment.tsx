import { Role, User } from "@/models/user.model";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useUserStore } from "@/store/user.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatRawComment, PageComment, RawComment } from "./useFetchComments";
import { authFetch } from "@/helpers/api";

export interface NewComment {
  user: User;
  content: string;
}
async function sendNewComment(props: {
  newComment: NewComment;
}): Promise<RawComment> {
  const { setUser, setCommented } = useUserStore.getState();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: props.newComment.user.id,
      name: props.newComment.user.name,
      company: props.newComment.user.company,
      content: props.newComment.content,
      gender: props.newComment.user.gender,
    }),
  });

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
    return resData as RawComment;
  } else {
    throw new Error("Invalid response status code");
  }
}

async function sendNewCommentAuth(content: string) {
  const res = await authFetch("/comment/auth", {
    method: "POST",
    body: JSON.stringify({
      content: content,
    }),
  });

  if (res.status != 201) {
    throw new Error("Invalid response status code");
  }
  const rawComment: RawComment = (await res.json()) as RawComment;

  return rawComment;
}

const addComment = ({
  oldData,
  data,
}: {
  oldData: { pages: PageComment[] } | undefined;
  data: RawComment;
}): { pages: PageComment[] } => {
  const formatedComment = formatRawComment(data);
  formatedComment.pending = true;
  if (!oldData) {
    return {
      pages: [{ comments: [formatedComment], nextPage: 2 }],
    };
  }
  return {
    ...oldData,
    pages: [
      {
        ...oldData.pages[0],
        comments: [formatedComment, ...oldData.pages[0].comments],
      },
      ...oldData.pages.slice(1),
    ],
  };
};

export function useSendNewComment() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotication();
  const onSuccess = (data: RawComment) => {
    addNotification("Thank for a new comment. <3 <3", NotificationType.SUCCESS);
    queryClient.setQueryData<{ pages: PageComment[] }>(
      ["comments"],
      (oldData) => {
        return addComment({ oldData: oldData, data: data });
      },
    );
  };

  const onError = () => {
    addNotification("Got error when add new comment", NotificationType.SUCCESS);
  };

  return useMutation({
    mutationFn: sendNewComment,
    onSuccess: onSuccess,
    onError: onError,
  });
}

export function useSendAuthNewComment() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotication();
  const onSuccess = (data: RawComment) => {
    addNotification("Thank for a new comment. <3 <3", NotificationType.SUCCESS);
    queryClient.setQueryData<{ pages: PageComment[] }>(
      ["comments"],
      (oldData) => {
        return addComment({ oldData: oldData, data: data });
      },
    );
  };

  const onError = () => {
    addNotification("Got error when add new comment", NotificationType.SUCCESS);
  };

  return useMutation({
    mutationFn: sendNewCommentAuth,
    onSuccess: onSuccess,
    onError: onError,
  });
}
