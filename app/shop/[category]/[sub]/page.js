import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, slug } from "@/lib/catalog";
import CategoryView from "@/components/CategoryView";

export function generateStaticParams() {
  return CATEGORIES.flatMap((c) => c.subs.map((s) => ({ category: slug(c.name), sub: slug(s) })));
}

const find = (category, sub) => {
  const cat = getCategory(category);
  return { cat, name: cat?.subs.find((s) => slug(s) === sub) };
};

export async function generateMetadata({ params }) {
  const { category, sub } = await params;
  const { cat, name } = find(category, sub);
  return { title: name ? `${name} · ${cat.name}` : "Not found" };
}

export default function SubPage({ params }) {
  return (
    <Suspense fallback={<section className="page" />}>
      <Sub params={params} />
    </Suspense>
  );
}

async function Sub({ params }) {
  const { category, sub } = await params;
  const { cat, name } = find(category, sub);
  if (!name) notFound();
  return <CategoryView cat={cat} sub={name} base={`/shop/${category}`} />;
}