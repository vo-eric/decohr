import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Provider from "./_trpc/Provider";
import { Toaster } from "~/components/ui/sonner";
import { funnelSans } from "./ui/fonts";
import NavBar from "~/components/ui/nav-bar";

export const metadata: Metadata = {
  title: "decohr",
  description: "a tool to help you find the perfect home decor",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className={`${funnelSans.className}`}>
        <Provider>
          <NavBar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
