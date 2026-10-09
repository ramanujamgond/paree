import { formatPrice } from "@/lib/format";
import { getOrderTotal, type ResolvedOrderLine } from "@/lib/order";
import { getFullName, type Product } from "@/lib/products";

export const ORDER_SEPARATOR = "\n\n----------------\n\n";

function buildOrderBlock(line: ResolvedOrderLine, index: number): string {
  return `*${index + 1}. ${line.name}*\n*Size:* ${line.sizeLabel}\n*Quantity:* ${line.quantity}\n*Unit price:* ${formatPrice(line.unitPrice)}\n*Subtotal:* ${formatPrice(line.lineTotal)}`;
}

export function buildOrderMessage(lines: readonly ResolvedOrderLine[]): string {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  return (
    "Hello,\n\n*PYAREE ORDER*\nI would like to place an order:\n\n*ITEMS*\n\n" +
    lines.map(buildOrderBlock).join(ORDER_SEPARATOR) +
    ORDER_SEPARATOR +
    `*ORDER SUMMARY*\n*Total items:* ${itemCount}\n*Total:* ${formatPrice(getOrderTotal(lines))}` +
    "\n\n*DELIVERY*\nPlease confirm delivery charges and the next steps for delivery.\n\nThank you."
  );
}

export function buildWhatsAppUrl(number: string | null, text: string): string | null {
  if (number === null) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildEnquiryMessage(product: Product): string {
  return `Hello, I'd like to know more about ${getFullName(product)}.`;
}
