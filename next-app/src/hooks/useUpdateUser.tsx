import { UserInformationData } from "@/app/profile/page";
import { authFetch } from "@/helpers/authFetch";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useMutation } from "@tanstack/react-query";

async function updateUser(props: {
  data: UserInformationData;
  onSuccess?: () => void;
}) {
  const res = await authFetch("/auth/user-update", {
    method: "PATCH",
    body: JSON.stringify({
      ...props.data,
      gender: props.data.gender == "male",
    }),
  });
  if (!res.ok) throw new Error("Got error when update user information");
  if (props.onSuccess) props.onSuccess();
  return res;
}

export default function useUpdateUser() {
  const { addNotification } = useNotication();

  return useMutation({
    mutationFn: updateUser,
    onError: () => {
      addNotification(
        "Got error when update user information",
        NotificationType.ERROR,
      );
    },
    onSuccess: () => {
      addNotification(
        "Update user information successfully",
        NotificationType.SUCCESS,
      );
    },
  });
}
