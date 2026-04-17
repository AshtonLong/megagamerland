import type { Metadata } from "next";
import { siteLocale, siteName } from "@/lib/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: siteLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
