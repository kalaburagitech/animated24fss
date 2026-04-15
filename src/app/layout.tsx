import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StickyCta } from "@/components/StickyCta";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "24 FSS | Fire Safety Training",
  description:
    "Premium fire safety training, ERT programs, and audits — cinematic, compliant, and built for real emergencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen font-sans">
        <LoadingScreen />
        <Navbar />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
