import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt =
  "MegaGamerLand store featuring premium rusty pipes, patina pieces, and collector rust decor.";

export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function Image() {
  return createSocialImage({
    eyebrow: "Rusty Pipe Store",
    title: "Shop patina-rich pipes and decor",
    subtitle:
      "Browse farm-grown rusty pipes, deep patina collector pieces, bundles, and outdoor accents.",
    accentLabel: "Store",
  });
}
