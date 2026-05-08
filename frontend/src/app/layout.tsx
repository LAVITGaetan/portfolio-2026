import type { Metadata } from "next";
import { Russo_One, DM_Mono } from "next/font/google";
import "./globals.css";

const russoOne = Russo_One({
  variable: "--font-russo-one",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Portfolio - Gaëtan Lavit",
  description: "Architecte Système d'Informations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${russoOne.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}