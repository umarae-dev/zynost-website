import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { SplashCursor } from "@/components/effects/SplashCursor";
import { AmbientBackground } from "@/components/shared/AmbientBackground";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// A distinctive display face for headlines/branding — pairing a geometric
// display font with a clean grotesk body font (kept on Inter) is the same
// two-font system most large SaaS/fintech sites use rather than one
// typeface doing every job.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "crypto AI analysis",
    "trading intelligence",
    "AI trading agents",
    "crypto verdict",
    "backtested trading signals",
    "System Planned Trade",
    "decision intelligence",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: SITE.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      sameAs: [`https://x.com/${SITE.twitter.replace("@", "")}`],
    },
    {
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: SITE.description,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "0",
        highPrice: "16.99",
        priceCurrency: "USD",
        offerCount: "3",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <AmbientBackground />
            <SplashCursor />
            <Navbar />
            <main id="main-content" className="relative z-10 flex-1">
              {children}
            </main>
            <Footer />
            <ScrollToTopButton />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
