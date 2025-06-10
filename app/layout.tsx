// portfolio/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Assuming Geist is Geist_Sans from your setup
import "./globals.css";

const geistSans = Geist({ // Make sure 'Geist' is the correct named import for Geist Sans
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mithran.org'),
  title: "Mithran Mohanraj - Portfolio",
  description: "Portfolio of Mithran Mohanraj showcasing projects and skills.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-neutral-50 dark:bg-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}