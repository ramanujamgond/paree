import { getProductsByCategory } from "@/lib/products";
import { PageIntro, ProductCard } from "@/components/ui";
import { OrderingBand } from "@/components/footer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("The oils", "Discover Pyaree Black Mustard, Yellow Mustard, Groundnut, Sunflower, Sesame and Coconut wood-pressed oils, with current sizes and prices.", "/products");
export default function Products() { return <><PageIntro label="Care in every bottle" title="The oils." text="Different seeds. Distinctive character. Find the oil that belongs in your everyday cooking."/><section className="catalogue container"><div className="product-grid">{getProductsByCategory("wood-pressed-oils").map(product => <ProductCard key={product.id} product={product}/>)}</div><div className="also-heading"><h2>Also from Pyaree</h2><p>A separate addition to the range.</p></div><div className="castor-grid">{getProductsByCategory("other-oils").map(product => <ProductCard key={product.id} product={product}/>)}</div></section><OrderingBand/></>; }
