import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

// Self-hosted (SIL OFL) so builds don't depend on Google Fonts being reachable
const sarabun = localFont({
  variable: "--font-sarabun",
  display: "swap",
  src: [
    { path: "./fonts/sarabun-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/sarabun-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/sarabun-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/sarabun-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const lato = localFont({
  variable: "--font-lato",
  display: "swap",
  src: [
    { path: "./fonts/lato-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lato-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/lato-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_AU",
    type: "website",
  },
  verification: siteConfig.verification,
};

export const viewport: Viewport = {
  themeColor: "#162329",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${sarabun.variable} ${lato.variable}`}>
      <body>
        {siteConfig.analytics.gtmId && <GoogleTagManagerNoScript gtmId={siteConfig.analytics.gtmId} />}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <TopBar html={siteConfig.announcement.html} />
        <Header config={siteConfig} />
        <main id="main">{children}</main>
        <Footer config={siteConfig} />
        {siteConfig.analytics.gtmId && <GoogleTagManager gtmId={siteConfig.analytics.gtmId} hosts={siteConfig.analytics.hosts} />}
      </body>
    </html>
  );
}
