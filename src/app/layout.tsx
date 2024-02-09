import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stay-Hotel || Home",
  description: "It's a hotel booking website",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="flex flex-col min-h-screen bg-secondary">
            <Navbar />
            <section className="flex-grow">{children}</section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
