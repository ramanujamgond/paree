import type { Product, ProductSize } from "@/lib/products";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const listFormatter = new Intl.ListFormat("en-IN", { type: "conjunction" });

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function formatCardPrice(sizes: readonly ProductSize[]): string {
  const minPrice = Math.min(...sizes.map((s) => s.price));
  return sizes.length > 1 ? `From ${formatPrice(minPrice)}` : formatPrice(minPrice);
}

export function formatSizeLabels(sizes: readonly ProductSize[]): string {
  return sizes.map((s) => s.label).join(" · ");
}

export function describeRange(products: readonly Product[]): string {
  const entries = products.map(
    (product) =>
      `${product.shortName} (${listFormatter.format(product.sizes.map((s) => s.label))})`,
  );
  return `We currently offer ${listFormatter.format(entries)}.`;
}

export function formatPhoneDisplay(number: string): string {
  if (/^91\d{10}$/.test(number)) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
  }
  return `+${number}`;
}
