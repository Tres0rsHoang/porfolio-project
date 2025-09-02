"use client";

import { Fragment, useEffect, useState } from "react";
import { Loading } from "./loading/loading_full";
import { useAuthStore } from "@/store/auth.store";

type Props = {
  children: React.ReactNode;
  images: string[];
};

export default function DataPreloadProvider({ children, images }: Props) {
  const [loading, setLoading] = useState(true);
  const { isRefreshing: accessTokenRefreshing, ensureToken } = useAuthStore();

  useEffect(() => {
    ensureToken();
  }, [ensureToken]);

  useEffect(() => {
    const promises = images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    );
    Promise.all(promises).then(() => setLoading(false));
  }, [images]);

  return loading || accessTokenRefreshing ? (
    <div className="fixed inset-0 flex items-center justify-center bg-(--background) text-white z-50">
      <Loading isShow={true} />
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
}
