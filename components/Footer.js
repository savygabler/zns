"use client";

import { useSite } from "./SiteProvider";

export default function Footer() {
  const { setModal } = useSite();
  return (
    <footer>
      <div className="f-l"></div>
      <div className="f-c">
        <button className="subl" onClick={() => setModal("join")}>Join the Exclusive List</button>
        <button onClick={() => setModal("shipping")}>Shipping &amp; Returns</button>
        <button onClick={() => setModal("terms")}>Terms &amp; Conditions</button>
      </div>
      <div className="f-r">
        <button className="sup" onClick={() => setModal("support")} aria-label="Customer support">
          <span>Support</span>
          <span className="ib" style={{ color: "var(--fg)" }}>
            <svg className="ico" viewBox="0 0 24 24">
              <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
              <path d="M4 14h3v5H5.5A1.5 1.5 0 0 1 4 17.5z" />
              <path d="M20 14h-3v5h1.5a1.5 1.5 0 0 0 1.5-1.5z" />
              <path d="M19 19c0 2-2 2.8-5 2.8" />
            </svg>
          </span>
        </button>
      </div>
    </footer>
  );
}
