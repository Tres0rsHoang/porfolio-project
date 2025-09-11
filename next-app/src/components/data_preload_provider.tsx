"use client";

import { Fragment, useEffect, useState } from "react";
import { Loading } from "./loading/loading_full";
import { useAuthStore } from "@/store/auth.store";
import "@/helpers/i18n.ts";
import useFetchComments from "@/hooks/useFetchComments";

type Props = {
  children: React.ReactNode;
  images: string[];
  fonts: string[];
};

export default function DataPreloadProvider({
  children,
  images,
  fonts,
}: Props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [fontLoading, setFontLoading] = useState(true);
  const { isRefreshing: accessTokenRefreshing, ensureToken } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { data: comments } = useFetchComments();

  useEffect(() => {
    setLoading(
      imageLoading ||
        accessTokenRefreshing ||
        fontLoading ||
        comments == undefined ||
        typeof window == "undefined",
    );
  }, [accessTokenRefreshing, imageLoading, fontLoading, comments]);

  useEffect(() => {
    ensureToken();
  }, [ensureToken]);

  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") {
  //     const interval = setInterval(() => {
  //       i18n.reloadResources(i18n.language);
  //     }, 2000);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

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

  const preloadFont = (
    name: string,
    url: string,
    retries = 3,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const attempt = (remain: number) => {
        const font = new FontFace(name, `url(${url}?t=${Date.now()})`);

        font
          .load()
          .then((loadedFace) => {
            // Add font vào document
            document.fonts.add(loadedFace);
            resolve();
          })
          .catch((err) => {
            if (remain > 0) {
              attempt(remain - 1);
            } else {
              reject(new Error(`Failed to load font: ${url}, error: ${err}`));
            }
          });
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
    Promise.all(promises).then(() => setImageLoading(false));
  }, [images]);

  useEffect(() => {
    const promises = fonts.map((src) =>
      preloadFont("My Fonts", src, 3).catch((err) => {
        console.error(err);
      }),
    );
    Promise.all(promises).then(() => setFontLoading(false));
  }, [fonts]);

  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-(--background) text-white z-50">
      <Loading isShow={true} />
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
}
