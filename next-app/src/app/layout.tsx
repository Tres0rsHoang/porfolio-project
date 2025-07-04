import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const simpsonFont = localFont({
    src: "../../public/fonts/Simpsonfont.ttf",
});
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const comicNeue = localFont({
    src: "../../public/fonts/ComicNeue-Bold.ttf",
    weight: "700",
    variable: "--font-comic-neue",
});

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
                {children}
            </body>
        </html>
    );
}

