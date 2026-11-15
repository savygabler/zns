"use client";

import { useEffect } from "react";
import { useSite } from "./SiteProvider";

export default function ClearCart() {
  const { clear } = useSite();
  useEffect(() => clear(), [clear]);
  return null;
}
