"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EXCLUSIVE, productsIn } from "@/lib/catalog";
import { currentMember, enter } from "@/lib/members";
import { useSite } from "./SiteProvider";
import ProductCard from "./ProductCard";

export default function ExclusiveGate() {
  const { setModal, toast } = useSite();
  const [member, setMember] = useState(undefined);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [sub, setSub] = useState(null);
  useEffect(() => setMember(currentMember()), []);

  if (member === undefined) return <section className="page" />;

  if (!member) {
    const go = () => {
      const u = enter(code);
      if (!u) return setErr("We couldn’t find that member. Check the spelling or join the list.");
      setMember(u);
      toast(`Welcome, ${u}`);
    };
    return (
      <section className="page narrow">
        <div className="crumb"><Link href="/">Home</Link> / Exclusive</div>
        <h1>Members only</h1>
        <p className="sub-t">Enter the username or member code you created when you joined the list.</p>
        <div className="mbox inline">
          <input placeholder="Username or member code" autoComplete="off" aria-label="Username or member code"
            value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
          <p style={{ color: "var(--em2)", minHeight: "1.4em", margin: "0 0 8px" }}>{err}</p>
          <button className="co" style={{ width: "100%" }} onClick={go}>Enter</button>
          <p style={{ margin: "14px 0 0" }}>
            Not a member? <button className="lk" onClick={() => setModal("join")}>Join the Exclusive List</button>
          </p>
        </div>
      </section>
    );
  }

  const items = productsIn(EXCLUSIVE.name, sub);
  return (
    <section className="page">
      <div className="crumb"><Link href="/">Home</Link> / Exclusive{sub ? ` / ${sub}` : ""}</div>
      <h1>{sub || "Exclusive"}</h1>
      <p className="sub-t">Members only · Welcome, {member} · {items.length} pieces · ZNS</p>
      <div className="pills">
        <button className={sub ? "" : "on"} onClick={() => setSub(null)}>All</button>
        {EXCLUSIVE.subs.map((s) => (
          <button key={s} className={sub === s ? "on" : ""} onClick={() => setSub(s)}>{s}</button>
        ))}
      </div>
      <div className="grid">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
