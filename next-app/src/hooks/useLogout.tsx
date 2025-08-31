"use client";

import { authFetch } from "@/helpers/authFetch";
import { useAuthStore } from "@/store/auth.store";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useUserStore } from "@/store/user.store";
import { useMutation } from "@tanstack/react-query";

const getLogout = async () => {
  const res = await authFetch("/auth/logout");
  if (!res.ok) throw new Error("Fail to logout");
};

export function useLogout() {
  const { addNotification } = useNotication();
  const { clearTokens } = useAuthStore();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: getLogout,
    onSuccess: () => {
      clearTokens();
      clearUser();
      addNotification("Logout Successfully!!!", NotificationType.SUCCESS);
    },
    onError: () => {
      addNotification("Got error on log out", NotificationType.ERROR);
    },
  });
}
