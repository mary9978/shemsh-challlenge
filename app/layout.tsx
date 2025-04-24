import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "شمش | اپلیکیشن خرید طلا",
  description: "به راحتی خرید و فروش طلای خود را به ما بسپارید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
