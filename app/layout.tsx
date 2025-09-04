// portfolio/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SettingsProvider } from "@/contexts/SettingsContext";
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
  metadataBase: new URL('https://mithran.org'),
  title: "Mithran Mohanraj - Software Engineer",
  description: "Software Engineer specializing in AI/ML systems, enterprise security, and cloud architecture. Currently at Lumbra Inc. building multi-LLM orchestration pipelines.",
  openGraph: {
    title: "Mithran Mohanraj - Software Engineer",
    description: "Software Engineer specializing in AI/ML systems, enterprise security, and cloud architecture. Experience with Fortune 500 companies.",
    images: [
      {
        url: '/images/mitmo.png',
        alt: 'Mithran Mohanraj Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mithran Mohanraj - Software Engineer",
    description: "Software Engineer specializing in AI/ML systems, enterprise security, and cloud architecture.",
    images: ['/images/mitmo.png'],
  },
  icons: {
    icon: [
      { url: '/logo512.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/logo512.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: [
      { url: '/logo512.png', type: 'image/png' }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}