import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Kouer - Produits locaux d'exception",
  description:
    "Découvrez Kouer : une sélection de produits locaux, labels de qualité et filtres personnalisés pour trouver vos pépites du terroir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${plusJakartaSans.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
