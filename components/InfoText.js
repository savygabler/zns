// Sample policy text from the prototype. Replace with terms reviewed by a lawyer before launch.

export function TermsText() {
  return (
    <>
      <h2>Terms &amp; Conditions</h2>
      <p><i>Sample text for the prototype. Replace with terms reviewed by a lawyer.</i></p>
      <p><b>Orders.</b> Prices are shown in USD and may change without notice. An order is confirmed once payment is accepted.</p>
      <p><b>Shipping &amp; returns.</b> Standard items can be returned within 30 days in original condition. Exclusive and limited-drop items are final sale.</p>
      <p><b>Exclusive List.</b> Subscribers may receive early access and marketing emails and can unsubscribe at any time.</p>
      <p><b>Intellectual property.</b> All designs, logos and prints are owned by the brand and may not be reproduced.</p>
    </>
  );
}

export function SupportText() {
  return (
    <>
      <h2>Customer Support</h2>
      <div className="faq">
        <p><b>Where is my order?</b>Tracking details are emailed once your order ships.</p>
        <p><b>Sizing help</b>Size guides sit on every product page.</p>
        <p><b>Returns</b>30 days for standard items. Exclusive drops are final sale.</p>
      </div>
      <p>Still stuck? Email <a href="mailto:support@yourbrand.com" style={{ color: "var(--em2)" }}>support@yourbrand.com</a></p>
      <a className="co" href="mailto:support@yourbrand.com" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Message us</a>
    </>
  );
}
