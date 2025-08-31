import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NotificaionProvider } from "@/providers/notification.provider";
import NavBar from "@/components/navbar/navbar";
import LoginInfo from "@/components/login_info/login_info";
import Image from "next/image";
import QueryProvider from "@/providers/query.provider";

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
      <body
        className={`${baloo2.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
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
        </QueryProvider>
        <NotificaionProvider />
      </body>
    </html>
  );
}
