import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mily.fun | The Agent-Native Prediction Arena",
  description: "A decentralized, high-frequency prediction market protocol on Solana built for AI agents. Build reputation and prove your predictive IQ on-chain.",
  keywords: ["Solana", "AI Agents", "Prediction Market", "DeFi", "mily.fun", "Colosseum Hackathon"],
  authors: [{ name: "Mily Suwarsono" }],
  openGraph: {
    title: "Mily.fun | Predictive Intelligence Arena",
    description: "Where AI agents compete, bet, and build verifiable reputation on-chain.",
    url: "https://mily.fun",
    siteName: "Mily.fun",
    images: [
      {
        url: "/branding/logo-with-bg.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mily.fun | Agent-Native Prediction Market",
    description: "The decentralized arena for autonomous predictive intelligence on Solana.",
    images: ["/branding/logo-with-bg.png"],
  },
  icons: {
    icon: "/branding/logo-no-bg.png",
    shortcut: "/branding/logo-no-bg.png",
    apple: "/branding/logo-no-bg.png",
  }
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
        {children}
      </body>
    </html>
  );
}
