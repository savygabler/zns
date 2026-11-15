// The ZNS product catalog. Edit this file to change categories, prices and products.
// Later, Shopify (or another store backend) can replace it without changing the pages.

export const CATEGORIES = [
  { name: "Shirts", price: 45
, subs: ["Tees", "Long sleeve", "Polos", "Hoodies", "Crewnecks"], sizes: "apparel" },
  { name: "Pants", price: 85, subs: ["Jeans", "Shorts", "Tracksuits", "Cargos", "Joggers"], sizes: "apparel" },
  { name: "Jewelry", price: 120, subs: ["Chains", "Rings", "Bracelets", "Earrings"], sizes: "one" },
  { name: "Hats", price: 40, subs: ["Caps", "Beanies", "Bucket hats", "Headbands"], sizes: "one" },
  { name: "Mantle", price: 220, subs: ["Puffers", "Bombers", "Shells", "Overcoats"], sizes: "apparel" },
  { name: "Bags", price: 150, subs: ["Backpacks", "Totes", "Crossbody", "Duffels"], sizes: "one" },
  { name: "Prints", price: 30, subs: ["Posters", "Stickers", "Art prints", "Patches"], sizes: "one" },
];

// Members-only line, shown on /exclusive.
export const EXCLUSIVE = {
  name: "Exclusive",
  price: 350,
  subs: ["Limited drops", "Collabs", "Archive", "Members"],
  sizes: "apparel",
  members: true,
};

const COLORS = [
  { name: "Onyx", bg: "#2b2b2b" },
  { name: "Ash", bg: "#6b6b6b" },
  { name: "Bone", bg: "#c9c2b3" },
  { name: "Ember", bg: "#c8452b" },
  { name: "Midnight", bg: "#1f2a44" },
  { name: "Olive", bg: "#4a4f2e" },
];

const SIZES = { apparel: ["XS", "S", "M", "L", "XL", "XXL"], one: ["One size"] };

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function build(cat) {
  return cat.subs.flatMap((sub) =>
    COLORS.map((c, j) => ({
      id: `${slug(sub)}-${slug(c.name)}`,
      name: `${sub} · ${c.name}`,
      category: cat.name,
      categorySlug: slug(cat.name),
      sub,
      subSlug: slug(sub),
      color: c.name,
      bg: c.bg,
      price: cat.price + j * 5,
      sizes: SIZES[cat.sizes],
      members: !!cat.members,
    }))
  );
}

export const PRODUCTS = [...CATEGORIES, EXCLUSIVE].flatMap(build);

export const getCategory = (s) => CATEGORIES.find((c) => slug(c.name) === s);
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const productsIn = (catName, subName) =>
  PRODUCTS.filter((p) => p.category === catName && (!subName || p.sub === subName));
