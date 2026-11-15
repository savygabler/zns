import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page narrow">
      <h1>Not found</h1>
      <p className="sub-t">That page doesn’t exist.</p>
      <Link className="co wide" href="/">Back to ZNS</Link>
    </section>
  );
}
