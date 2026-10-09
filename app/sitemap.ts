import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
import { getAllProducts } from "@/lib/products";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/products", "/story", "/process", "/philosophy", "/contact", "/faq", ...getAllProducts().map(p => `/products/${p.slug}`)].map(path => ({ url: new URL(path || "/", siteUrl).toString(), changeFrequency: "monthly", priority: path === "" ? 1 : .7 })); }
