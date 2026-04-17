import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmed-universe.vercel.app'
  ),
  title: "Ahmed's Universe — Gamified Portfolio",
  description:
    "Explore the journey of Ahmed Eid Gomaa — Lead Frontend Engineer. An interactive, gamified portfolio built with Next.js, GSAP, and Framer Motion. Scroll through levels to discover milestones, projects, and achievements.",
  keywords: [
    "Ahmed Eid Gomaa",
    "Frontend Engineer",
    "Portfolio",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Game Portfolio",
    "Cairo",
    "Egypt",
  ],
  authors: [{ name: "Ahmed Eid Gomaa", url: "https://linkedin.com/in/ahmed-gomaa-ahmed" }],
  openGraph: {
    title: "Ahmed's Universe — The Developer with the Game Portfolio",
    description:
      "Scroll through Ahmed's journey: from Engineering Student to Lead Architect. An interactive portfolio experience.",
    type: "website",
    locale: "en_US",
    siteName: "Ahmed's Universe",
    images: [
      {
        url: '/og_image.webp',
        width: 1200,
        height: 630,
        alt: "Ahmed's Universe Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed's Universe — Gamified Portfolio",
    description: "An interactive journey through the career of Ahmed Eid Gomaa.",
    images: ['/og_image.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CustomCursor from '@/components/game/CustomCursor';
import Preloader from '@/components/game/Preloader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-level="dreamy">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
