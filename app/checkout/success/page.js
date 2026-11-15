import Link from "next/link";
import ClearCart from "@/components/ClearCart";

export const metadata = { title: "Order confirmed" };

export default function Success() {
  return (
    <section className="page narrow">
      <ClearCart />
      <div className="crumb"><Link href="/">Home</Link> / Order</div>
      <h1>Thank you</h1>
      <p className="sub-t">Your order is confirmed. A receipt is on its way to your email, and tracking follows once it ships.</p>
      <Link className="co wide" href="/">Back to ZNS</Link>
    </section>
  );
}
