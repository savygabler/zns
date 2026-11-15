"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getProduct } from "@/lib/catalog";

const Site = createContext(null);
export const useSite = () => useContext(Site);

const KEY = "zns_cart";

export default function SiteProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const timer = useRef(null);

  // Load the saved cart once, then save it whenever it changes.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      setCart(saved.filter((i) => getProduct(i.id)));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, loaded]);

  const toast = useCallback((m) => {
    setToastMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(""), 1800);
  }, []);

  const add = useCallback((id, size, qty = 1) => {
    setCart((c) => {
      const hit = c.find((i) => i.id === id && i.size === size);
      if (hit) return c.map((i) => (i === hit ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
      return [...c, { id, size, qty }];
    });
  }, []);
  const setQty = useCallback((idx, qty) => {
    setCart((c) => (qty < 1 ? c.filter((_, i) => i !== idx) : c.map((it, i) => (i === idx ? { ...it, qty: Math.min(10, qty) } : it))));
  }, []);
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setCart([]);
  }, []);

  const count = cart.reduce((a, i) => a + i.qty, 0);

  return (
    <Site.Provider value={{ cart, count, add, setQty, clear, drawer, setDrawer, modal, setModal, toast }}>
      {children}
      <div id="toast" className={toastMsg ? "on" : ""}>{toastMsg}</div>
    </Site.Provider>
  );
}
