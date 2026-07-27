import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { business } from "@/data/business";
import { localBusinessSchema } from "@/data/schema";
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

const TITLE = `${business.nameFull} — Blocked drains & CCTV camera inspection, Atlantic Seaboard`;
const DESCRIPTION =
  "High-pressure drain cleaning and drainpipe camera inspection on the Atlantic Seaboard, Cape Town — Sea Point, Green Point, Camps Bay and beyond. Blocked drains cleared — talk to Mark on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: business.url,
    siteName: business.nameFull,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${business.nameFull} — ${business.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1E2D",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexSans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}
