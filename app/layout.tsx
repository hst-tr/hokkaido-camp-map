import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hokkaido-camp-map.vercel.app"),

  title: {
    default: "北海道のキャンプ場MAP",
    template: "%s | 北海道のキャンプ場MAP",
  },

  description:
    "北海道のキャンプ場を、エリア・キャンプスタイル・ロケーション・設備などの条件から探せるキャンプ場検索サイト。",

  keywords: [
    "北海道",
    "キャンプ場",
    "キャンプ",
    "キャンプ場検索",
    "北海道キャンプ",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "北海道のキャンプ場MAP",
    description:
      "北海道のキャンプ場を条件や地図から探せるキャンプ場検索サイト。",
    url: "https://hokkaido-camp-map.vercel.app/",
    type: "website",
    locale: "ja_JP",
    siteName: "北海道のキャンプ場MAP",
    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "北海道のキャンプ場MAP",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "北海道のキャンプ場MAP",
    description:
      "北海道のキャンプ場を条件や地図から探せるキャンプ場検索サイト。",
    images: ["/ogp.jpg"],
  },

  robots: {
    index: process.env.SITE_PUBLIC === "true",
    follow: process.env.SITE_PUBLIC === "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}