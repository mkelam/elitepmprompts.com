import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PWARegister } from "@/app/components/PWARegister";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://elitepmprompts.com";
const siteName = "ElitePMPrompts — The Project Manager's Nexus";
const siteDescription = "Methodology-native AI workflow blueprints that produce complete PM artifacts in 60-90 minutes. SAFe PI Planning, PRINCE2, PMBOK, COBIT. Built for enterprise project managers.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ElitePMPrompts`,
  },
  description: siteDescription,
  keywords: [
    "SAFe PI Planning AI",
    "agentic PM workflows",
    "project management AI blueprints",
    "SAFe 6.0 copilot",
    "PI Planning automation",
    "PRINCE2 AI prompts",
    "PMBOK AI workflow",
    "COBIT governance AI",
    "release train engineer tools",
    "PMO AI automation",
    "project management prompt library",
    "enterprise PM tools",
    "methodology-native AI",
    "PM artifact generation",
  ],
  authors: [{ name: "ElitePMPrompts" }],
  creator: "ElitePMPrompts",
  publisher: "ElitePMPrompts",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ElitePMPrompts",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: "ElitePMPrompts",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ElitePMPrompts — Agentic AI Blueprints for Enterprise PMs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ElitePMPrompts",
  description: siteDescription,
  url: siteUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      name: "SAFe Blueprint Single",
      price: "297",
      priceCurrency: "USD",
      description: "Single agentic blueprint — complete PM artifacts in 60-90 minutes.",
    },
    {
      "@type": "Offer",
      name: "SAFe Methodology Suite",
      price: "697",
      priceCurrency: "USD",
      description: "All 4 SAFe blueprints — PI Planning, Inspect & Adapt, ART Sync, Portfolio Kanban.",
    },
    {
      "@type": "Offer",
      name: "Free PM Prompt Library",
      price: "0",
      priceCurrency: "USD",
      description: "50+ methodology-aligned AI prompts across 12 PM frameworks.",
    },
  ],
  featureList: [
    "SAFe 6.0 PI Planning Copilot",
    "Multi-step agentic workflow blueprints",
    "Complete PM artifact generation",
    "Checkpoint-driven quality gates",
    "Model-agnostic (Claude, ChatGPT, Gemini)",
    "50+ free PM prompts across 12 frameworks",
    "Offline-first PWA",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} circuit-bg min-h-screen text-white/90`}>
        <div className="fixed inset-0 bg-black/75 z-[-1]" />
        <Navbar />
        {children}
        <Footer />
        <PWARegister />
      </body>
    </html>
  );
}
