import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import GoogleAdsTracking from "@/components/GoogleAdsTracking";
import Navigation from "@/components/Navigation";

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
      <head>
        <GoogleAdsTracking />
      </head>
      <body className="antialiased font-cinzel">
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
