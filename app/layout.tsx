import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { OrderProvider } from "@/components/order";
import { siteUrl } from "@/lib/config";
import { hasLogo } from "@/lib/logo";
import "./globals.css";
const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: "Pyaree · Apno ke Liye, Pyar Se", template: "%s · Pyaree" }, description: "Unrefined, unheated, 100% pure wood-pressed oils. From Barik Agro Industries, Balangir, Odisha, for the people you love.", openGraph: { title: "Pyaree Woodpressed Oils", description: "Apno ke Liye, Pyar Se. Wood-pressed oils with natural aroma and character.", images: ["/images/1.jpeg"], type: "website", locale: "en_IN" } };
export const viewport: Viewport = { themeColor: "#213c2b" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en-IN" className={`${sans.variable} ${serif.variable}`}><body><OrderProvider><a href="#main" className="skip-link">Skip to content</a><Header hasLogo={hasLogo}/><main id="main">{children}</main><Footer/></OrderProvider></body></html>; }
