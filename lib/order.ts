import { MAX_QUANTITY } from "@/lib/config";
import { getFullName, type Product } from "@/lib/products";

export type OrderLine = { productId: string; sizeId: string; quantity: number };

export type OrderAction =
  | { type: "add"; productId: string; sizeId: string; quantity: number }
  | { type: "setQuantity"; productId: string; sizeId: string; quantity: number }
  | { type: "remove"; productId: string; sizeId: string }
  | { type: "clear" };

export type ResolvedOrderLine = {
  productId: string;
  sizeId: string;
  quantity: number;
  name: string;
  slug: string;
  sizeLabel: string;
  unitPrice: number;
  lineTotal: number;
};

export function clampQuantity(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(n)));
}

function isSameLine(line: OrderLine, productId: string, sizeId: string): boolean {
  return line.productId === productId && line.sizeId === sizeId;
}

export function orderReducer(state: OrderLine[], action: OrderAction): OrderLine[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((line) => isSameLine(line, action.productId, action.sizeId));
      if (!existing) {
        return [
          ...state,
          {
            productId: action.productId,
            sizeId: action.sizeId,
            quantity: clampQuantity(action.quantity),
          },
        ];
      }
      return state.map((line) =>
        line === existing
          ? { ...line, quantity: clampQuantity(line.quantity + action.quantity) }
          : line,
      );
    }
    case "setQuantity":
      return state.map((line) =>
        isSameLine(line, action.productId, action.sizeId)
          ? { ...line, quantity: clampQuantity(action.quantity) }
          : line,
      );
    case "remove":
      return state.filter((line) => !isSameLine(line, action.productId, action.sizeId));
    case "clear":
      return [];
  }
}

function lineExists(products: readonly Product[], productId: string, sizeId: string): boolean {
  return products.some(
    (product) => product.id === productId && product.sizes.some((s) => s.id === sizeId),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseStoredOrder(raw: unknown, products: readonly Product[]): OrderLine[] {
  if (!Array.isArray(raw)) return [];
  let lines: OrderLine[] = [];
  for (const item of raw) {
    if (!isRecord(item)) continue;
    const { productId, sizeId, quantity } = item;
    if (typeof productId !== "string" || typeof sizeId !== "string") continue;
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) continue;
    if (!lineExists(products, productId, sizeId)) continue;
    lines = orderReducer(lines, { type: "add", productId, sizeId, quantity });
  }
  return lines;
}

export function resolveOrderLines(
  lines: readonly OrderLine[],
  products: readonly Product[],
): ResolvedOrderLine[] {
  const resolved: ResolvedOrderLine[] = [];
  for (const line of lines) {
    const product = products.find((p) => p.id === line.productId);
    const size = product?.sizes.find((s) => s.id === line.sizeId);
    if (!product || !size) continue;
    resolved.push({
      productId: line.productId,
      sizeId: line.sizeId,
      quantity: line.quantity,
      name: getFullName(product),
      slug: product.slug,
      sizeLabel: size.label,
      unitPrice: size.price,
      lineTotal: size.price * line.quantity,
    });
  }
  return resolved;
}

export function getOrderTotal(lines: readonly ResolvedOrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}
