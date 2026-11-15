// Placeholder product art. Swap for real photos: <img src={product.image} alt={product.name} />
export default function ProductImage({ product }) {
  return (
    <div className="ph2" style={{ background: `linear-gradient(160deg,${product.bg},#111)` }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="38" r="14" fill="rgba(255,255,255,.35)" />
        <path d="M18 100Q20 60 50 56Q80 60 82 100z" fill="rgba(255,255,255,.35)" />
      </svg>
    </div>
  );
}
