import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GsapProvider } from "@/components/gsap-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

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
  title: "MegaGamerLand — Premium Rusty Pipes",
  description:
    "North Bay Ontario's premier rusty pipe farm. We grow, harvest, and deliver the finest rusty pipes straight from the earth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
            <main className="flex-1">{children}</main>
            <Footer />
            {/* Global grain overlay */}
            <div className="grain" aria-hidden="true" />
          </SmoothScroll>
        </GsapProvider>
      </body>
    </html>
  );
}
