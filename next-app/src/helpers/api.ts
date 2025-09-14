import { useAuthStore } from "@/store/auth.store";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useUserStore } from "@/store/user.store";

export async function authFetch(uri: string, options: RequestInit = {}) {
  const { accessToken, setToken, clearTokens } = useAuthStore.getState();
  const { addNotification } = useNotication.getState();
  const { clearUser } = useUserStore.getState();

  const url = process.env.NEXT_PUBLIC_SERVER_URL + "/api" + uri;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (res.status == 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      const newToken = data.accessToken;
      setToken(newToken);
      return await authFetch(uri, options);
    }

    if (refreshRes.status == 401 || !refreshRes.ok) {
      addNotification("Session expired", NotificationType.ERROR);
      clearTokens();
      clearUser();
    }
  }

  return res;
}
