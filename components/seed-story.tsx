"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Product } from "@/lib/products";
import { Arrow } from "@/components/ui";

type StoryProduct = Product & { story: NonNullable<Product["story"]> };

export function SeedStory({ products }: { products: StoryProduct[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="seed-story">
      <div className="seed-story-stage" aria-hidden="true">
        {products.map((product, i) => (
          <Image
            key={product.id}
            src={product.story.art.src}
            alt=""
            width={product.story.art.width}
            height={product.story.art.height}
            sizes="(max-width: 760px) 1px, 45vw"
            className={i === active ? "is-active" : ""}
          />
        ))}
        <span className="seed-story-count">
          {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
        </span>
      </div>
      <ol className="seed-story-list">
        {products.map((product, i) => (
          <li
            key={product.id}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            className={i === active ? "is-active" : ""}
          >
            <Image
              className="seed-story-inline"
              src={product.story.art.src}
              alt={product.story.art.alt}
              width={product.story.art.width}
              height={product.story.art.height}
              sizes="(max-width: 760px) 90vw, 1px"
            />
            <span className="seed-story-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{product.shortName}</h3>
            {product.tagline && <p className="seed-story-tagline">{product.tagline}</p>}
            <dl>
              <div>
                <dt>From</dt>
                <dd>{product.story.seed}</dd>
              </div>
              {product.tasteProfile && (
                <div>
                  <dt>Taste</dt>
                  <dd>{product.tasteProfile}</dd>
                </div>
              )}
              <div>
                <dt>In your kitchen</dt>
                <dd>{product.story.kitchen}</dd>
              </div>
            </dl>
            <Link className="text-link" href={`/products/${product.slug}`}>
              Meet {product.shortName} <Arrow diagonal />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ParallaxArt({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);
  return (
    <div ref={ref} className="parallax-art">
      <motion.div style={{ y }}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 760px) 90vw, 45vw" />
      </motion.div>
    </div>
  );
}
