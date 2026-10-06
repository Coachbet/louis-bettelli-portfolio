import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Louis Bettelli — AI, Data & Management",
  description: "Louis Bettelli's portfolio — ESSEC × CentraleSupélec student specializing in artificial intelligence, data and management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
