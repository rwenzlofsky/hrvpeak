import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import { NavMenu } from "./components/NavMenu";
import { LoggedInMenu } from "./components/LoggedInMenu";
import GetSession from "./getsessioninfo/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRVPeak for Whoop",
  description: "The best Whoop analytics you can get",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
