import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, slug } from "@/lib/catalog";
import CategoryView from "@/components/CategoryView";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: slug(c.name) }));
}

export async function generateMetadata({ params }) {
  const cat = getCategory((await params).category);
  return { title: cat ? cat.name : "Not found" };
}

// The page reads its address inside <Suspense> so links can show the page shell instantly.
export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<section className="page" />}>
      <Category params={params} />
    </Suspense>
  );
}

async function Category({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  return <CategoryView cat={cat} base={`/shop/${category}`} />;
}