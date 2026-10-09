import { formatPrice } from "@/lib/format";
import { getOrderTotal, type ResolvedOrderLine } from "@/lib/order";
import { getFullName, type Product } from "@/lib/products";

export const ORDER_SEPARATOR = "\n\n----------------\n\n";

function buildOrderBlock(line: ResolvedOrderLine): string {
  return `Product:\n${line.name}\n\nSize:\n${line.sizeLabel}\n\nQuantity:\n${line.quantity}\n\nPrice:\n${formatPrice(line.lineTotal)}`;
}

export function buildOrderMessage(lines: readonly ResolvedOrderLine[]): string {
  return (
    "Hello,\n\nI would like to place an order:\n\n" +
    lines.map(buildOrderBlock).join(ORDER_SEPARATOR) +
    ORDER_SEPARATOR +
    `Total:\n${formatPrice(getOrderTotal(lines))}` +
    "\n\nPlease let me know the next steps for delivery.\n\nThank you."
  );
}

export function buildWhatsAppUrl(number: string | null, text: string): string | null {
  if (number === null) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildEnquiryMessage(product: Product): string {
  return `Hello, I'd like to know more about ${getFullName(product)}.`;
}
