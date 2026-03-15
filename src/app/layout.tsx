import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portpressure.alberni.dev"),
  title: "Port Pressure Solutions",
  description:
    "Professional pressure washing services on Vancouver Island. Residential and commercial cleaning.",
  icons: {
    icon: "/pressurelogow.png",
    apple: "/pressurelogow.png",
  },
  openGraph: {
    title: "Port Pressure Solutions",
    description:
      "Professional pressure washing services on Vancouver Island. Residential and commercial cleaning.",
    images: [
      {
        url: "/pressurelogow.png",
        width: 1024,
        height: 1024,
        alt: "Port Pressure Solutions Logo",
      },
    ],
    siteName: "Port Pressure Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Port Pressure Solutions",
    description:
      "Professional pressure washing services on Vancouver Island. Residential and commercial cleaning.",
    images: ["/pressurelogow.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
