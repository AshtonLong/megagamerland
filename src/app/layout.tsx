import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GsapProvider } from "@/components/gsap-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  siteDescription,
  siteKeywords,
  siteLocale,
  siteName,
  siteUrl,
} from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  creator: siteName,
  publisher: siteName,
  category: "shopping",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName,
    locale: siteLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a08",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-deep"
      >
        <GsapProvider>
          <SmoothScroll>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <div className="grain" aria-hidden="true" />
          </SmoothScroll>
        </GsapProvider>
      </body>
    </html>
  );
}
