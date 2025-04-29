import type { Metadata } from "next";
import "./globals.css";
import { APP_TITLE } from "@/utils/constants";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "به راحتی خرید و فروش طلای خود را به ما بسپارید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
