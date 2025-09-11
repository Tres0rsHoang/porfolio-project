import { authFetch } from "@/helpers/api";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useMutation } from "@tanstack/react-query";

export default function useEditComment() {
  const { addNotification } = useNotication();

  return useMutation({
    mutationFn: async (props: { commentId: number; newContent: string }) => {
      const res = await authFetch(`/comment/${props.commentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          content: props.newContent,
        }),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      addNotification(
        "Comment refreshed — smoother than Marge’s blue hair.",
        NotificationType.SUCCESS,
      );
    },
    onError: () => {
      addNotification("Got error on edit comment", NotificationType.ERROR);
    },
  });
}
