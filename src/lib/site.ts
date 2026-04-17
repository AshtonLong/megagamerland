export const siteName = "MegaGamerLand";
export const siteUrl = "https://megagamerland.ca";
export const siteLocale = "en_CA";
export const siteDescription =
  "MegaGamerLand is North Bay, Ontario's premium rusty pipe farm for naturally oxidized pipes, patina-rich decor pieces, and collector-grade rust.";

export const siteKeywords = [
  "rusty pipes",
  "rusty pipe farm",
  "North Bay Ontario decor",
  "patina pipe decor",
  "oxidized iron pipes",
  "rust decor Canada",
  "collector rusty pipes",
  "farm-grown rusty pipes",
];

export const streetAddress = "663 McIntyre St W";
export const addressLocality = "North Bay";
export const addressRegion = "Ontario";
export const addressCountry = "CA";

export const farmAddress = `${streetAddress}, ${addressLocality}, ${addressRegion}`;

export const contactEmail = "greg@megagamerland.ca";
export const contactPhone = "+1-705-499-5396";
export const displayPhone = "705-499-5396";

export const farmDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  farmAddress,
)}`;

export interface FarmHour {
  label: string;
  daysOfWeek: string[];
  opens?: string;
  closes?: string;
  hoursLabel: string;
}

export const farmHours: FarmHour[] = [
  {
    label: "Mon - Fri",
    daysOfWeek: [
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
    ],
    opens: "08:00",
    closes: "18:00",
    hoursLabel: "8am - 6pm",
  },
  {
    label: "Saturday",
    daysOfWeek: ["https://schema.org/Saturday"],
    opens: "09:00",
    closes: "16:00",
    hoursLabel: "9am - 4pm",
  },
  {
    label: "Sunday",
    daysOfWeek: ["https://schema.org/Sunday"],
    hoursLabel: "Closed",
  },
];

export const homeFaqs = [
  {
    question: "Where is MegaGamerLand located?",
    answer:
      "MegaGamerLand is based in North Bay, Ontario at 663 McIntyre St W, where visitors can browse our rusty pipe farm and pick out pieces in person.",
  },
  {
    question: "Do you ship rusty pipes outside Ontario?",
    answer:
      "Yes. We ship naturally oxidized pipes and patina pieces across Canada and to customers in the United States with protective packaging for decor and display use.",
  },
  {
    question: "How are your rusty pipes made?",
    answer:
      "Our pipes are farm-grown and naturally oxidized using North Bay's climate, rainfall, and freeze-thaw cycles rather than artificial factory finishes.",
  },
  {
    question: "What kinds of rusty pipes do you sell?",
    answer:
      "The collection ranges from entry-level surface rust pieces to deep-patina collector pipes, outdoor garden accents, and curated bundles for designers and artists.",
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
