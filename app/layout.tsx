import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PWARegister } from "@/app/components/PWARegister";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://pm-nexus.com";
const siteName = "The Project Manager's Nexus";
const siteDescription = "The Ultimate Command Center for Enterprise Project Execution. 50+ specialized AI prompts for Agile, Waterfall, Hybrid, Construction, and ITIL methodologies. Framework-aligned. Offline-first. Built for professionals.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "project management prompts",
    "AI prompts for PMs",
    "PMBOK prompts",
    "Agile prompts",
    "Scrum prompts",
    "Waterfall project management",
    "construction project management",
    "ITIL prompts",
    "risk management AI",
    "stakeholder management",
    "project charter template",
    "sprint planning AI",
    "enterprise project tools",
    "offline project management",
  ],
  authors: [{ name: "PM Nexus" }],
  creator: "PM Nexus",
  publisher: "PM Nexus",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Project Manager's Nexus - Enterprise Command Center",
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

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  offers: {
    "@type": "Offer",
    price: "49",
    priceCurrency: "USD",
    description: "Full access to 50+ PM prompts. One-time purchase.",
  },
  featureList: [
    "50+ Project Management AI Prompts",
    "Offline-First PWA",
    "Export to Excel & Markdown",
    "Variable Substitution",
    "PMBOK, Agile, PRINCE2 Aligned",
    "Construction & ITIL Specialized",
    "Risk, Stakeholder, Schedule Management",
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
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} circuit-bg min-h-screen text-white/90`}>
        <div className="fixed inset-0 bg-black/75 z-[-1]" />
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
