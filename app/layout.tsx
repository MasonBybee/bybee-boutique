import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/actions/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bybee Boutique",
  description: "It's the bee's knees",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getSession(true);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
