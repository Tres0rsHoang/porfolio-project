import { authFetch } from "@/helpers/api";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteComment() {
  const { addNotification } = useNotication();
  return useMutation({
    mutationFn: async (props: { commentId: number }) => {
      const res = await authFetch(`/comment/${props.commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      addNotification(
        "Poof! Your comment disappeared like Bart’s homework.",
        NotificationType.SUCCESS,
      );
    },
    onError: () => {
      addNotification(
        "Got error when deleted your comment",
        NotificationType.ERROR,
      );
    },
  });
}
