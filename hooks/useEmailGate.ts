"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pmnexus_email_captured";

export function useEmailGate() {
  const [hasEmail, setHasEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      setHasEmail(stored === "true");
      setIsLoading(false);
    }
  }, []);

  const recordEmail = useCallback((email: string) => {
    setHasEmail(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  return { hasEmail, isLoading, recordEmail };
}
