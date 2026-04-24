import type { Metadata } from "next";
import HomePageClient from "./page-client";
import { createPageMetadata, serializeJsonLd } from "@/lib/seo";
import {
  absoluteUrl,
  addressCountry,
  addressLocality,
  addressRegion,
  contactEmail,
  contactPhone,
  farmDirectionsHref,
  farmHours,
  homeFaqs,
  siteDescription,
  siteName,
  streetAddress,
} from "@/lib/site";

const homeTitle = "Rusty Pipe Farm in North Bay, Ontario";
const homeDescription =
  "Shop naturally oxidized rusty pipes grown in North Bay, Ontario. MegaGamerLand offers patina-rich decor, collector pieces, and farm-direct shipping across Canada and the US.";

export const metadata: Metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  keywords: [
    "North Bay rusty pipes",
    "Ontario rusty pipe farm",
    "patina decor Canada",
    "naturally oxidized pipes",
  ],
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: siteName,
      description: siteDescription,
      inLanguage: "en-CA",
      publisher: {
        "@id": absoluteUrl("/#store"),
      },
    },
    {
      "@type": "Store",
      "@id": absoluteUrl("/#store"),
      name: siteName,
      url: absoluteUrl("/"),
      description: homeDescription,
      image: [
        absoluteUrl("/assets/landing/hero.webp"),
        absoluteUrl("/assets/landing/rusty-pipe-fittings-on-weathered-wood.webp"),
      ],
      logo: absoluteUrl("/icon.svg"),
      email: contactEmail,
      telephone: contactPhone,
      hasMap: farmDirectionsHref,
      areaServed: ["Canada", "United States"],
      address: {
        "@type": "PostalAddress",
        streetAddress,
        addressLocality,
        addressRegion,
        addressCountry,
      },
      openingHoursSpecification: farmHours
        .filter((entry) => entry.opens && entry.closes)
        .map((entry) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: entry.daysOfWeek,
          opens: entry.opens,
          closes: entry.closes,
        })),
    },
    {
      "@type": "FAQPage",
      "@id": absoluteUrl("/#faq"),
      mainEntity: homeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
