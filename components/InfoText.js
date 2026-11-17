// Store policies shown in the footer pop-ups. Have them checked before launch.
import { CONTACT_EMAIL, RETURN_DAYS, SHIPPING, money } from "@/lib/site";

const Email = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--em2)" }}>{CONTACT_EMAIL}</a>
);

export function ShippingText() {
  return (
    <>
      <h2>Shipping &amp; Returns</h2>
      <p><b>Shipping.</b> Orders ship within 2 business days. Prices are in Australian dollars.</p>
      <table className="ship">
        <thead>
          <tr><th>Ship to</th><th>Cost</th><th>Free over</th><th>Arrives</th></tr>
        </thead>
        <tbody>
          {SHIPPING.map((s) => (
            <tr key={s.code}>
              <td>{s.name}</td>
              <td>{money(s.rate)}</td>
              <td>{money(s.freeOver)}</td>
              <td>{s.days[0]}–{s.days[1]} business days</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>International orders may be charged import duties or taxes by the destination country. These are paid by the customer.</p>
      <p><b>Returns.</b> Changed your mind? Return unworn, unwashed items with tags attached within {RETURN_DAYS} days of delivery for a refund or a different size. Email <Email /> with your order number to start a return. You pay return postage unless the item is faulty.</p>
      <p><b>Final sale.</b> Exclusive drops, earrings and stickers can’t be returned for a change of mind.</p>
      <p><b>Faulty or wrong items.</b> If something arrives faulty, damaged or not as described, email us within 30 days with a photo and we’ll repair, replace or refund it, including postage. This applies to every item, final sale included, and doesn’t limit your rights under the Australian Consumer Law.</p>
      <p><b>Refunds</b> go back to your original payment method within 5 business days of us receiving the return.</p>
    </>
  );
}

export function TermsText() {
  return (
    <>
      <h2>Terms &amp; Conditions</h2>
      <p><i>Draft terms. Have these reviewed before launch.</i></p>
      <p><b>Orders.</b> Prices are in Australian dollars and may change without notice. Customers outside Australia may see an estimate in their own currency at checkout. An order is confirmed once payment is accepted.</p>
      <p><b>Shipping &amp; returns.</b> See Shipping &amp; Returns for costs, delivery times and how to return an item.</p>
      <p><b>Exclusive List.</b> Members may receive early access and marketing emails and can unsubscribe at any time.</p>
      <p><b>Intellectual property.</b> All designs, logos and prints are owned by ZNS and may not be reproduced.</p>
      <p><b>Contact.</b> <Email /></p>
    </>
  );
}

export function SupportText() {
  return (
    <>
      <h2>Customer Support</h2>
      <div className="faq">
        <p><b>Where is my order?</b>Tracking details are emailed once your order ships.</p>
        <p><b>Sizing help</b>Email us your usual size and we’ll recommend a fit.</p>
        <p><b>Returns</b>{RETURN_DAYS} days on unworn items. Exclusive drops are final sale.</p>
      </div>
      <p>Still stuck? Email <Email /></p>
      <a className="co" href={`mailto:${CONTACT_EMAIL}`} style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Message us</a>
    </>
  );
}
