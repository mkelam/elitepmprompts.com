"use client";

import { useState, useEffect, useCallback } from "react";
import type { PurchaseRecord } from "@/lib/types";

const STORAGE_KEY = "pmnexus_purchases";

export function useBlueprintAccess() {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);

  // Load from localStorage + detect dev mode after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDevMode(window.location.hostname === "localhost");
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setPurchases(JSON.parse(stored));
        } catch {
          // Invalid JSON
        }
      }
      setIsLoading(false);
    }
  }, []);

  const hasPurchased = useCallback(
    (blueprintId: string): boolean => {
      // Dev mode: unlock everything on localhost (set after hydration)
      if (isDevMode) return true;
      // Check direct blueprint purchase
      if (purchases.some((p) => p.blueprintId === blueprintId)) return true;
      // Check suite purchases (unlocks all blueprints in that suite)
      if (purchases.some((p) => p.blueprintId === "safe-suite")) return true;
      if (purchases.some((p) => p.blueprintId === "pmbok-suite")) return true;
      return false;
    },
    [purchases, isDevMode]
  );

  const recordPurchase = useCallback(
    (record: PurchaseRecord) => {
      const updated = [...purchases, record];
      setPurchases(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    },
    [purchases]
  );

  return {
    purchases,
    isLoading,
    hasPurchased,
    recordPurchase,
  };
}
