import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/assets/landing/hero.png"),
        absoluteUrl("/assets/landing/rusty-pipe-fittings-on-weathered-wood.png"),
      ],
    },
    {
      url: absoluteUrl("/store"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
      images: products.slice(0, 6).map((product) => absoluteUrl(product.imageSrc)),
    },
  ];
}
