"use client";

import { useState, useEffect, useCallback } from "react";
import type { PurchaseRecord } from "@/lib/types";

const STORAGE_KEY = "pmnexus_purchases";

export function useBlueprintAccess() {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
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
      // Check direct blueprint purchase
      if (purchases.some((p) => p.blueprintId === blueprintId)) return true;
      // Check suite purchase (unlocks all blueprints in suite)
      if (purchases.some((p) => p.blueprintId === "safe-suite")) return true;
      return false;
    },
    [purchases]
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
