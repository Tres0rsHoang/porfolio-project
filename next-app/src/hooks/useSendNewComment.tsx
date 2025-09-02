import { Role, User } from "@/models/user.model";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useUserStore } from "@/store/user.store";
import { useMutation } from "@tanstack/react-query";
export interface NewComment {
  user: User;
  content: string;
}
async function sendNewComment(props: {
  newComment: NewComment;
  onSuccess?: () => void;
}): Promise<boolean> {
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
  }
  if (props.onSuccess) props.onSuccess();
  return res.status === 201;
}

export default function useSendNewComment() {
  const { addNotification } = useNotication();
  return useMutation({
    mutationFn: sendNewComment,
    onSuccess: () => {
      addNotification(
        "Thank for a new comment. <3 <3",
        NotificationType.SUCCESS,
      );
    },
    onError: () => {
      addNotification(
        "Got error when add new comment",
        NotificationType.SUCCESS,
      );
    },
  });
}
