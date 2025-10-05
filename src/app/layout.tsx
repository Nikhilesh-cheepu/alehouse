import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Alehouse - The Realm of Alehouse",
  description: "The banners are raised, the ale is brewing, the Realm of Alehouse is being forged.",
  version: "4b05d9a", // Force deployment for autoplay fixes
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-cinzel">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
