import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt =
  "MegaGamerLand rusty pipe farm in North Bay, Ontario with naturally oxidized decor and collector pieces.";

export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function Image() {
  return createSocialImage({
    eyebrow: "Rusty Pipe Farm",
    title: "Natural rust, grown in North Bay",
    subtitle:
      "Premium rusty pipes, collector-grade patina, and field-fresh decor shipped across Canada and the US.",
    accentLabel: "Home",
  });
}
