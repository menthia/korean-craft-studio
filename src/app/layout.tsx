import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "온결 공방 | 한국 전통 공예",
  description:
    "온결 공방은 도자기, 나전칠기, 보자기, 목공예를 소개하는 가상의 공방입니다. 개발 실습용 프로토타입이며 실제 주문이나 예약은 이루어지지 않습니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
