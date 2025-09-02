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

  const preloadImage = (src: string, retries = 3): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const attempt = (remain: number) => {
        img.src = src + (src.includes("?") ? "&" : "?") + "t=" + Date.now(); // bust cache
        img.onload = () => resolve();
        img.onerror = () => {
          if (remain > 0) {
            attempt(remain - 1);
          } else {
            reject(new Error(`Failed to load image: ${src}`));
          }
        };
      };
      attempt(retries);
    });
  };

  useEffect(() => {
    const promises = images.map((src) =>
      preloadImage(src, 3).catch((err) => {
        console.error(err);
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
