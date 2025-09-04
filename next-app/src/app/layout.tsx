import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NotificaionProvider } from "@/providers/notification.provider";
import NavBar from "@/components/navbar/navbar";
import LoginInfo from "@/components/login_info/login_info";
import Image from "next/image";
import QueryProvider from "@/providers/query.provider";
import Head from "next/head";
import InteractiveBadge from "@/components/interactive_badge";
import {
  getAllFontsFromPublicFolder,
  getAllImagesFromPublicFolder,
} from "@/helpers/getPublicImages";
import DataPreloadProvider from "@/components/data_preload_provider";
import FloadingComments from "@/components/floading_comments/floading_comments";

const baloo2 = localFont({
  src: "../../public/fonts/Baloo2-SemiBold.ttf",
});

export const metadata: Metadata = {
  title: "Hoang Quoc Bao Profile",
  description:
    "This is the profile page of Hoang Quoc Bao, a software engineer.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const images: string[] = getAllImagesFromPublicFolder();
  const fonts: string[] = getAllFontsFromPublicFolder();

  return (
    <html lang={params.locale}>
      <Head>
        <meta property="og:title" content="Bao Hoang Portfolio" />
        <meta property="og:description" content="Bao Hoang Portfolio Website" />
        <meta property="og:image" content="/images/ProfilePicSimpson.png" />
        <meta property="og:url" content="/images/ProfilePicSimpson.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body
        className={`${baloo2.className} antialiased`}
        suppressHydrationWarning={true}
        style={{
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
        }}
      >
        <DataPreloadProvider images={images} fonts={fonts}>
          <QueryProvider>
            <div className="relative w-dvw h-dvh overflow-hidden">
              <div className="homepage">
                <main className="relative w-full h-dvh justify-center items-center flex flex-col">
                  <NavBar />
                  <LoginInfo />
                  <div className="content-container">{children}</div>
                  <div className="w-full bg-(--blue) border-black border-t-2 px-2">
                    <footer className="flex flex-row justify-end items-center">
                      <Image
                        src="/images/WordPressLogo.png"
                        alt="wordpress"
                        width={25}
                        height={25}
                      ></Image>
                      <p>Proudly powered by… me. Who needs WordPress?</p>
                    </footer>
                  </div>
                </main>
              </div>
            </div>
            <div className="namecard absolute h-dvh w-dvw top-0 left-0">
              <FloadingComments />
              <InteractiveBadge />
            </div>
          </QueryProvider>
          <NotificaionProvider />
        </DataPreloadProvider>
      </body>
    </html>
  );
}
