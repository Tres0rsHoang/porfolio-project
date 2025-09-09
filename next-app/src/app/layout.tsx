import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.PUBLIC_APP_URL ?? "https://www.baohomeserver.uk";

export const metadata: Metadata = {
  title: "Bao Hoang Profile",
  description:
    "I build apps, not donuts 🍩. Peek into my portfolio and leave a cute comment—I’d love to hear from you!",
  keywords: [
    "Hoang Quoc Bao",
    "Software Engineer",
    "Portfolio",
    "Web Developer",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Hoang Quoc Bao", url: siteUrl }],
  generator: "Next.js",
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Bao Hoang Portfolio",
    locale: "en",
    url: siteUrl,
    siteName: "Bao Hoang Portfolio",
    description:
      "Code, coffee, and cartoons fuel this portfolio. Take a look & leave a friendly comment—it makes my day! ☕💻",
    images: [
      {
        url: `${siteUrl}/images/Thumbnail.jpg`,
        width: 1200,
        height: 630,
        alt: "ProfilePic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bao Hoang Portfolio",
    description:
      "Code, coffee, and cartoons fuel this portfolio. Take a look & leave a friendly comment—it makes my day! ☕💻",
    images: [`${siteUrl}/images/Thumbnail.jpg`],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}`,
      "vi-VN": `${siteUrl}`,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hoang Quoc Bao",
              url: siteUrl,
              sameAs: [
                "https://www.linkedin.com/in/hoangquocbao/",
                "https://github.com/Tres0rsHoang",
                "https://leetcode.com/u/baokyo002/",
                "https://facebook.com/Tres0rs/",
              ],
              jobTitle: "Software Engineer",
            }),
          }}
        />
      </head>
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
            <LoginInfo />
            <LanguageSelection />
            <NotificaionProvider />
          </DataPreloadProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
