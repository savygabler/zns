"use client";

import Link from "next/link";
import { CATEGORIES, slug } from "@/lib/catalog";
import { useSite } from "./SiteProvider";

export default function Header() {
  const { count, setDrawer } = useSite();
  return (
    <header>
      <div className="hl">
        <Link href="/" aria-label="ZNS home">
          <img id="logo" src="/logo-header.png" alt="ZNS home" />
        </Link>
        <span className="tg">To make the world a better place</span>
        <div className="soc">
          <a className="ib" href="https://www.instagram.com/zoe_vfly" target="_blank" rel="noopener" aria-label="Instagram">
            <svg className="ico" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r=".7" fill="currentColor" />
            </svg>
          </a>
          <a className="ib" href="https://www.tiktok.com/@Zoebone2" target="_blank" rel="noopener" aria-label="TikTok">
            <svg className="ico" viewBox="0 0 24 24">
              <path d="M14 3v10.2a3.6 3.6 0 1 1-3.6-3.6" />
              <path d="M14 3c.3 2.6 1.9 4.2 4.6 4.4" />
            </svg>
          </a>
        </div>
      </div>
      <nav id="nav">
        {CATEGORIES.map((c) => (
          <Link key={c.name} href={`/shop/${slug(c.name)}`}>{c.name}</Link>
        ))}
      </nav>
      <button id="cartbtn" onClick={() => setDrawer(true)}>Cart ({count})</button>
    </header>
  );
}
