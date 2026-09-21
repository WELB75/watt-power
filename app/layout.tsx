import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Watt Power — Énergie intelligente",
  description:
    "Watt Power donne aux particuliers et aux entreprises une vision précise et un contrôle clair de leur énergie.",
  openGraph: {
    title: "Watt Power — Énergie intelligente",
    description:
      "Production solaire, stockage et suivi réunis dans un seul système énergétique intelligent.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={geist.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
