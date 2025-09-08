import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NotificaionProvider } from "@/providers/notification.provider";
import NavBar from "@/components/navbar/navbar";
import LoginInfo from "@/components/login_info/login_info";
import Image from "next/image";
import QueryProvider from "@/providers/query.provider";
import InteractiveBadge from "@/components/interactive_badge";
import DataPreloadProvider from "@/components/data_preload_provider";
import LanguageSelection from "@/components/language/language_selection";
import { LazyFloadingComments } from "@/components/floading_comments/floading_comments";
import WordpressFooterText from "@/components/footer/worldpress_footer_text";
import AddCommentButton from "@/components/comments/add_comment_button";

const baloo2 = localFont({
  src: "../../public/fonts/Baloo2-SemiBold.ttf",
});

export const metadata: Metadata = {
  title: "Hoang Quoc Bao Profile",
  description:
    "This is the profile page of Hoang Quoc Bao, a software engineer.",
  openGraph: {
    title: "Bao Hoang Portfolio",
    description: "Bao Hoang Portfolio Website",
    images: ["/images/ProfilePicSimpson.png"],
    url: "https://www.yoursite.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bao Hoang Portfolio",
    description: "Bao Hoang Portfolio Website",
    images: ["/images/ProfilePicSimpson.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const images: string[] = getAllImagesFromPublicFolder();
  // const fonts: string[] = getAllFontsFromPublicFolder();

  return (
    <html lang="en">
      <body
        className={`${baloo2.className} antialiased`}
        suppressHydrationWarning={true}
        style={{
          overflow: "hidden",
        }}
      >
        <QueryProvider>
          <DataPreloadProvider images={[]} fonts={[]}>
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
                      <WordpressFooterText />
                    </footer>
                  </div>
                </main>
              </div>
            </div>
            <div className="namecard absolute h-full w-full top-0 left-0">
              <LazyFloadingComments />
              <InteractiveBadge />
              <div className="absolute bottom-5 right-5">
                <AddCommentButton />
              </div>
            </div>
            <LanguageSelection />
            <NotificaionProvider />
          </DataPreloadProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
