import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter_Tight({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maria Júlia Batista — Back-end & Tech na Educação",
  description: "Maria Júlia Batista: APIs em Node.js, automações e tecnologia na educação. Brasília, DF.",
  openGraph: {
    title: "Maria Júlia Batista — Back-end & Tech na Educação",
    description: "APIs e automações que tiram o trabalho repetitivo do caminho.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plex.variable} ${serif.variable}`}>
      <body>
        <div aria-hidden className="monitor-glow" />
        {children}
        <div aria-hidden className="vignette" />
        <div aria-hidden className="scanlines" />
      </body>
    </html>
  );
}
