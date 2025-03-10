import type { Metadata } from "next";

import { inter } from "@/typography";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wage Visualization",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
