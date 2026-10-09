import { describe, expect, it } from "vitest";
import { resolveOrderLines } from "@/lib/order";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import {
  ORDER_SEPARATOR,
  buildEnquiryMessage,
  buildOrderMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

const products = getAllProducts();

const ONE_LINE_MESSAGE = `Hello,

*PYAREE ORDER*
I would like to place an order:

*ITEMS*

*1. Pyaree Wood-Pressed Black Mustard Oil*
*Size:* 1 L
*Quantity:* 2
*Unit price:* ₹440
*Subtotal:* ₹880

----------------

*ORDER SUMMARY*
*Total items:* 2
*Total:* ₹880

*DELIVERY*
Please confirm delivery charges and the next steps for delivery.

Thank you.`;

const TWO_LINE_MESSAGE = `Hello,

*PYAREE ORDER*
I would like to place an order:

*ITEMS*

*1. Pyaree Wood-Pressed Black Mustard Oil*
*Size:* 1 L
*Quantity:* 2
*Unit price:* ₹440
*Subtotal:* ₹880

----------------

*2. Pyaree Wood-Pressed Coconut Oil*
*Size:* 250 ml
*Quantity:* 1
*Unit price:* ₹300
*Subtotal:* ₹300

----------------

*ORDER SUMMARY*
*Total items:* 3
*Total:* ₹1,180

*DELIVERY*
Please confirm delivery charges and the next steps for delivery.

Thank you.`;

describe("buildOrderMessage", () => {
  it("builds the exact message for a one-line order", () => {
    const lines = resolveOrderLines(
      [{ productId: "black-mustard-oil", sizeId: "1l", quantity: 2 }],
      products,
    );
    expect(buildOrderMessage(lines)).toBe(ONE_LINE_MESSAGE);
  });

  it("builds the exact message for a two-line order with line totals and the sum", () => {
    const lines = resolveOrderLines(
      [
        { productId: "black-mustard-oil", sizeId: "1l", quantity: 2 },
        { productId: "coconut-oil", sizeId: "250ml", quantity: 1 },
      ],
      products,
    );
    const message = buildOrderMessage(lines);
    expect(message).toBe(TWO_LINE_MESSAGE);
    expect(message.split(ORDER_SEPARATOR)).toHaveLength(3);
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link whose text decodes back to the message", () => {
    const url = buildWhatsAppUrl("918984868900", ONE_LINE_MESSAGE);
    expect(url?.startsWith("https://wa.me/918984868900?text=")).toBe(true);
    expect(new URL(url ?? "").searchParams.get("text")).toBe(ONE_LINE_MESSAGE);
  });

  it("returns null without a number", () => {
    expect(buildWhatsAppUrl(null, ONE_LINE_MESSAGE)).toBeNull();
  });
});

describe("buildEnquiryMessage", () => {
  it("uses the full product name", () => {
    const product = getProductBySlug("groundnut-oil");
    expect(product).toBeDefined();
    if (!product) return;
    expect(buildEnquiryMessage(product)).toBe(
      "Hello, I'd like to know more about Pyaree Wood-Pressed Groundnut Oil.",
    );
  });
});
