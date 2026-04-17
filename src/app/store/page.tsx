import type { Metadata } from "next";
import StorePageClient from "./store-page-client";
import { createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { products } from "@/lib/products";
import { absoluteUrl, siteName } from "@/lib/site";

const storeTitle = "Shop Rusty Pipes and Patina Pieces";
const storeDescription =
  "Browse MegaGamerLand's store for field-fresh rusty pipes, deep patina collector pieces, bundles, and outdoor accents shipped across Canada and the US.";

export const metadata: Metadata = createPageMetadata({
  title: storeTitle,
  description: storeDescription,
  path: "/store",
  keywords: [
    "buy rusty pipes online",
    "patina pipe store",
    "rust decor shop Canada",
    "collector rust pieces",
  ],
});

const storeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/store#webpage"),
      url: absoluteUrl("/store"),
      name: storeTitle,
      description: storeDescription,
      isPartOf: {
        "@id": absoluteUrl("/#website"),
      },
    },
    {
      "@type": "ItemList",
      "@id": absoluteUrl("/store#catalog"),
      name: `${siteName} rusty pipe catalog`,
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl("/store"),
        item: {
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: absoluteUrl(product.imageSrc),
          category: product.category,
          brand: {
            "@type": "Brand",
            name: siteName,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "CAD",
            price: product.price.toFixed(2),
            availability: "https://schema.org/InStock",
            url: absoluteUrl("/store"),
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
          },
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(storeJsonLd) }}
      />
      <StorePageClient />
    </>
  );
}
