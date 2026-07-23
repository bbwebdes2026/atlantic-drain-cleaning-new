import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { business } from "@/data/business";
import "./globals.css";

// Display face — headings, numerals, eyebrows. Weights 600/700 only.
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-archivo",
});

// Body / UI — copy, nav, buttons, forms. Weights 400/500/600.
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: `${business.nameFull} — Blocked drains & CCTV camera inspection, Atlantic Seaboard`,
  description:
    "High-pressure drain cleaning and drainpipe camera inspection on the Atlantic Seaboard, Cape Town. Blocked drains cleared — talk to Mark on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#0B1E2D",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
