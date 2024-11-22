import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import Container from "@/components/Container";
import LocationFilter from "@/components/LocationFilter";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://stay-hotel.vercel.app/"),
  keywords: ["hotel", "booking", "stay", "travel", "vacation"],
  title: {
    default: "Stay Hotel",
    template: "%s | Stay Hotel",
  },
  openGraph: {
    type: "website",
    locale: "en_US",

    url: "https://stay-hotel.vercel.app/",
    title: "Stay Hotel",
    description:
      "Find the best hotels for your stay, vacation, or travel. Book now! ",
    images: [
      {
        url: "https://stay-hotel-booking.vercel.app/logo.svg",
        width: 1200,
        height: 630,
        alt: "Stay Hotel",
      },
    ],
  },

  icons: {
    icon: "https://stay-hotel-booking.vercel.app/logo.svg",
  },
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-col min-h-screen bg-secondary">
              <Navbar />

              <LocationFilter />
              <section className="flex-grow">
                <NextTopLoader />
                <Container>{children}</Container>
              </section>
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
