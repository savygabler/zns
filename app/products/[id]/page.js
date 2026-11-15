import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/catalog";
import ProductImage from "@/components/ProductImage";
import ProductActions from "@/components/ProductActions";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const p = getProduct((await params).id);
  return p ? { title: p.name, description: `${p.name}, $${p.price}. ${p.category} by ZNS.` } : { title: "Not found" };
}

export default async function ProductPage({ params }) {
  const p = getProduct((await params).id);
  if (!p) notFound();
  const base = p.members ? "/exclusive" : `/shop/${p.categorySlug}`;
  return (
    <section className="page">
      <div className="crumb">
        <Link href="/">Home</Link> / <Link href={base}>{p.category}</Link> /{" "}
        <Link href={p.members ? base : `${base}/${p.subSlug}`}>{p.sub}</Link>
      </div>
      <div className="pdp">
        <ProductImage product={p} />
        <div>
          <h1>{p.name}</h1>
          <p className="price">${p.price}</p>
          <p className="sub-t">
            {p.sub} in {p.color}. {p.members ? "Members-only exclusive, final sale." : "Free returns within 30 days."}
          </p>
          <ProductActions product={p} />
        </div>
      </div>
    </section>
  );
}
