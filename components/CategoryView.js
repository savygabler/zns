import Link from "next/link";
import { productsIn, slug } from "@/lib/catalog";
import ProductCard from "./ProductCard";

// One category, optionally narrowed to a single subcategory.
export default function CategoryView({ cat, sub, base, note }) {
  const items = productsIn(cat.name, sub);
  const list = sub ? items : cat.subs.flatMap((s) => items.filter((p) => p.sub === s).slice(0, 3));
  return (
    <section className="page">
      <div className="crumb">
        <Link href="/">Home</Link> / <Link href={base}>{cat.name}</Link>
        {sub ? ` / ${sub}` : ""}
      </div>
      <h1>{sub || cat.name}</h1>
      <p className="sub-t">{note ? `${note} · ` : ""}{list.length} pieces · ZNS</p>
      <div className="pills">
        <Link href={base} className={sub ? "" : "on"}>All</Link>
        {cat.subs.map((s) => (
          <Link key={s} href={`${base}/${slug(s)}`} className={sub === s ? "on" : ""}>{s}</Link>
        ))}
      </div>
      <div className="grid">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
