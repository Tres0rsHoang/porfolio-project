import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NotificaionProvider } from "@/providers/notification.provider";
import NavBar from "@/components/navbar/navbar";
import LoginInfo from "@/components/login_info/login_info";
import Image from "next/image";
import QueryProvider from "@/providers/query.provider";
import Head from "next/head";
import InteractiveBadge from "@/components/information_card";

// const simpsonFont = localFont({
//   src: "../../public/fonts/Simpsonfont.ttf",
// });
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
//
// const comicNeue = localFont({
//   src: "../../public/fonts/ComicNeue-Bold.ttf",
//   weight: "700",
//   variable: "--font-comic-neue",
// });

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      >
        <QueryProvider>
          <div className="relative w-dvw h-dvh">
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
            <div className="namecard absolute h-dvh w-dvw top-0 -left-5 overflow-hidden">
              <InteractiveBadge />
              <h3>Please turn back when using bigger screen</h3>
            </div>
          </div>
        </QueryProvider>
        <NotificaionProvider />
      </body>
    </html>
  );
}
