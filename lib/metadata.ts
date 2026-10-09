import type { Metadata } from "next";
import { siteUrl } from "@/lib/config";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: new URL(path, siteUrl).toString(), siteName: "Pyaree", locale: "en_IN", type: "website", images: [{ url: "/images/1.jpeg", width: 1152, height: 1536, alt: "Pyaree Wood-Pressed Black Mustard Oil" }] }, twitter: { card: "summary_large_image", title, description, images: ["/images/1.jpeg"] } };
}
