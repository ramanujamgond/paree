const DEFAULT_SITE_URL = "http://localhost:3000";

export function normaliseWhatsAppNumber(raw: string | undefined): string | null {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`; // bare Indian mobile → add country code
  if (digits.length >= 11 && digits.length <= 15) return digits;
  return null;
}

// Keep ordering available when a deployment omits the public environment variable.
// Business contact supplied in PROJECT.md; valid environment values can override it.
export const whatsappNumber =
  normaliseWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "918984868900";

function readSiteUrl(raw: string | undefined): string {
  const trimmed = (raw ?? "").trim().replace(/\/+$/, "");
  if (trimmed) return trimmed;
  if (process.env.NODE_ENV === "production") {
    console.warn(`NEXT_PUBLIC_SITE_URL is not set; canonical URLs use ${DEFAULT_SITE_URL}`);
  }
  return DEFAULT_SITE_URL;
}

export const siteUrl = readSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const INSTAGRAM_URL = "https://www.instagram.com/pyaree_barikagro/";
export const INSTAGRAM_HANDLE = "@pyaree_barikagro";
export const HOME_COLLECTION_LIMIT = 8;
export const MAX_QUANTITY = 20;
export const ORDER_STORAGE_KEY = "pyaree-order-v1";

export const FILMS = {
  fields: {
    src: "https://videos.pexels.com/video-files/16196458/16196458-hd_1280_720_25fps.mp4",
    poster: "/images/art/mustard-field.jpg",
  },
  pour: {
    src: null,
    poster: "/images/art/film-poster.jpg",
  },
} as const;
export const ART = {
  seeds: { src: "/images/art/seeds-plate.jpg", width: 2200, height: 936, alt: "Botanical illustration of mustard, groundnut, sunflower, sesame and coconut" },
  woodPress: { src: "/images/art/wood-press.jpg", width: 1770, height: 2200, alt: "Illustration of a traditional wooden oil press with oil collecting in a brass bowl" },
  mustardField: { src: "/images/art/mustard-field.jpg", width: 2200, height: 936, alt: "Painted landscape of a mustard field in bloom at golden hour" },
} as const;
export const LOGO = {
  src: "/images/logo.png",
  width: 1280,
  height: 1600,
  alt: "Pyaree",
} as const;
