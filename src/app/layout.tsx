import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MJ.dev | Developer Portfolio",
    template: "%s | MJ.dev",
  },
  description:
    "QA 경험을 가진 개발자의 포트폴리오. 백엔드, 테스트, 품질에 관심이 많습니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "MJ.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body
        className={`${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
