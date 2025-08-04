import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alehouse - The Realm of Alehouse",
  description: "The banners are raised, the ale is brewing, the Realm of Alehouse is being forged.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
