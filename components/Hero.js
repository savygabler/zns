"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, slug } from "@/lib/catalog";
import { startHero } from "./hero-engine";

export default function Hero() {
  const router = useRouter();
  useEffect(() => {
    const stop = startHero({
      onPick: (ci, si) => {
        const c = CATEGORIES[ci];
        router.push(`/shop/${slug(c.name)}${si != null ? "/" + slug(c.subs[si]) : ""}`);
      },
      onLogo: () => router.push("/exclusive"),
    });
    return stop;
  }, [router]);

  return (
    <>
      <canvas id="bg"></canvas>
      <canvas id="fx"></canvas>
      <canvas id="tx"></canvas>
      <div id="brand">
        <div id="slogan"></div>
        <img id="logo2" src="/logo-hero.png" alt="ZNS" />
      </div>
      <main id="home"></main>
      <div id="hint">Hover a cube · click the logo for members</div>
    </>
  );
}
