"use client";

import { useState, useEffect, useCallback } from "react";
import type { BlueprintProgress } from "@/lib/types";

const STORAGE_PREFIX = "pmnexus_blueprint_progress_";

export function useBlueprintProgress(blueprintId: string) {
  const storageKey = `${STORAGE_PREFIX}${blueprintId}`;

  const [progress, setProgress] = useState<BlueprintProgress>({
    blueprintId,
    currentStep: 1,
    completedSteps: [],
    checkpointResults: {},
    startedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setProgress(JSON.parse(stored));
        } catch {
          // Invalid JSON, use defaults
        }
      }
      setIsLoading(false);
    }
  }, [storageKey]);

  // Save to localStorage
  const saveProgress = useCallback(
    (updated: BlueprintProgress) => {
      const withTimestamp = { ...updated, lastUpdatedAt: new Date().toISOString() };
      setProgress(withTimestamp);
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(withTimestamp));
      }
    },
    [storageKey]
  );

  const goToStep = useCallback(
    (step: number) => {
      saveProgress({ ...progress, currentStep: step });
    },
    [progress, saveProgress]
  );

  const markStepComplete = useCallback(
    (step: number) => {
      const completedSteps = progress.completedSteps.includes(step)
        ? progress.completedSteps
        : [...progress.completedSteps, step];
      const nextStep = step + 1;
      saveProgress({
        ...progress,
        completedSteps,
        currentStep: nextStep,
      });
    },
    [progress, saveProgress]
  );

  const updateCheckboxes = useCallback(
    (step: number, states: boolean[]) => {
      saveProgress({
        ...progress,
        checkpointResults: {
          ...progress.checkpointResults,
          [step]: states,
        },
      });
    },
    [progress, saveProgress]
  );

  const resetProgress = useCallback(() => {
    const fresh: BlueprintProgress = {
      blueprintId,
      currentStep: 1,
      completedSteps: [],
      checkpointResults: {},
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };
    setProgress(fresh);
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  }, [blueprintId, storageKey]);

  return {
    progress,
    isLoading,
    goToStep,
    markStepComplete,
    updateCheckboxes,
    resetProgress,
  };
}
