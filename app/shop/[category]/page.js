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

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  return <CategoryView cat={cat} base={`/shop/${category}`} />;
}
