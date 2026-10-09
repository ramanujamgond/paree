import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from "@/lib/products";

function publicFileExists(src: string): boolean {
  return existsSync(fileURLToPath(new URL(`../public${src}`, import.meta.url)));
}

function priceOf(slug: string, sizeId: string): number | undefined {
  return getProductBySlug(slug)?.sizes.find((s) => s.id === sizeId)?.price;
}

describe("catalogue", () => {
  it("returns every product sorted by order", () => {
    const orders = getAllProducts().map((p) => p.order);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("returns a copy that callers cannot use to mutate the catalogue", () => {
    const first = getAllProducts();
    first.reverse();
    expect(getAllProducts()[0].slug).toBe("black-mustard-oil");
  });

  it("has unique slugs and ids", () => {
    const products = getAllProducts();
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });

  it("gives every product at least one size with a positive integer price", () => {
    for (const product of getAllProducts()) {
      expect(product.sizes.length).toBeGreaterThan(0);
      for (const s of product.sizes) {
        expect(Number.isInteger(s.price)).toBe(true);
        expect(s.price).toBeGreaterThan(0);
      }
    }
  });

  it("pins a sample of client prices", () => {
    expect(priceOf("black-mustard-oil", "1l")).toBe(440);

    const coconut = getProductBySlug("coconut-oil");
    expect(coconut?.sizes).toHaveLength(1);
    expect(coconut?.sizes[0].id).toBe("250ml");
    expect(coconut?.sizes[0].price).toBe(300);

    const castor = getProductBySlug("castor-oil");
    expect(castor?.sizes).toHaveLength(1);
    expect(castor?.sizes[0].id).toBe("100ml");
    expect(castor?.sizes[0].price).toBe(240);
  });

  it("points every image and gallery src at a file under public", () => {
    for (const product of getAllProducts()) {
      const sources = [
        ...(product.image ? [product.image.src] : []),
        ...(product.story ? [product.story.art.src] : []),
        ...product.gallery.map((g) => g.src),
      ];
      for (const src of sources) {
        expect(publicFileExists(src), src).toBe(true);
      }
    }
  });

  it("carries no copy or image for Castor", () => {
    const castor = getProductBySlug("castor-oil");
    expect(castor).toBeDefined();
    expect(castor?.image).toBeNull();
    expect(castor?.tagline).toBeNull();
    expect(castor?.description).toBeNull();
    expect(castor?.tasteProfile).toBeNull();
    expect(castor?.highlights).toEqual([]);
    expect(castor?.story).toBeNull();
  });
});

describe("getProductBySlug", () => {
  it("finds a known slug", () => {
    expect(getProductBySlug("sesame-oil")?.shortName).toBe("Sesame");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProductBySlug("olive-oil")).toBeUndefined();
  });
});

describe("getRelatedProducts", () => {
  it("returns the next products in the same category", () => {
    expect(getRelatedProducts("black-mustard-oil").map((p) => p.slug)).toEqual([
      "yellow-mustard-oil",
      "groundnut-oil",
      "sunflower-oil",
    ]);
  });

  it("wraps around within the category and excludes the current product", () => {
    expect(getRelatedProducts("coconut-oil").map((p) => p.slug)).toEqual([
      "black-mustard-oil",
      "yellow-mustard-oil",
      "groundnut-oil",
    ]);
  });

  it("caps at the category size minus one", () => {
    const oils = getProductsByCategory("wood-pressed-oils");
    const related = getRelatedProducts("sesame-oil", 10);
    expect(related).toHaveLength(oils.length - 1);
    expect(related.map((p) => p.slug)).not.toContain("sesame-oil");
    expect(related.every((p) => p.category === "wood-pressed-oils")).toBe(true);
  });

  it("returns an empty list for Castor and for an unknown slug", () => {
    expect(getRelatedProducts("castor-oil")).toEqual([]);
    expect(getRelatedProducts("olive-oil")).toEqual([]);
  });
});
