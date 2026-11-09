import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Mono, VT323, Zen_Maru_Gothic } from "next/font/google";
import { THEME_BOOT_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const zen = Zen_Maru_Gothic({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-zen", display: "swap" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323", display: "swap" });
const plex = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maria Júlia // WIRED/OS",
  description:
    "Maria Júlia (MariaJuliaBat): APIs em Node.js, automações e projetos de hardware. Portfólio em forma de terminal, com satélite, radar e som.",
  openGraph: {
    title: "Maria Júlia // WIRED/OS",
    description: "APIs em Node.js, automações e projetos de hardware. Entre na Wired.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#050403",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      suppressHydrationWarning
      className={`${zen.variable} ${bebas.variable} ${vt323.variable} ${plex.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
