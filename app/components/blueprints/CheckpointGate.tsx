"use client";

import React, { useState, useEffect } from "react";
import { Shield, ChevronRight, AlertTriangle } from "lucide-react";
import type { CheckpointItem } from "@/lib/types";

interface CheckpointGateProps {
  title: string;
  items: CheckpointItem[];
  failAction: string;
  initialStates?: boolean[];
  onComplete: () => void;
  onSkip: () => void;
  onCheckboxChange: (states: boolean[]) => void;
}

export function CheckpointGate({
  title,
  items,
  failAction,
  initialStates,
  onComplete,
  onSkip,
  onCheckboxChange,
}: CheckpointGateProps) {
  const [checked, setChecked] = useState<boolean[]>(
    initialStates || new Array(items.length).fill(false)
  );

  const allChecked = checked.every(Boolean);

  useEffect(() => {
    onCheckboxChange(checked);
  }, [checked, onCheckboxChange]);

  const toggleItem = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="glass-modal p-5 space-y-4 border-l-2 border-l-nexus-cyan/50">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-nexus-cyan" />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
              checked[i]
                ? "bg-green-500/10 border border-green-500/20"
                : "bg-white/5 border border-white/5 hover:border-white/10"
            }`}
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggleItem(i)}
              className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 text-nexus-cyan focus:ring-nexus-cyan/50 cursor-pointer"
            />
            <div>
              <span className={`text-sm ${checked[i] ? "text-green-300" : "text-white/70"}`}>
                {item.label}
              </span>
              {item.description && (
                <p className="text-xs text-white/60 mt-0.5">{item.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onSkip}
          className="text-xs text-white/50 hover:text-white/70 transition-colors flex items-center gap-1"
        >
          <AlertTriangle className="w-3 h-3" />
          Skip checkpoint
        </button>

        <button
          onClick={onComplete}
          disabled={!allChecked}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            allChecked
              ? "bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white hover:opacity-90"
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          Continue to Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fail action hint */}
      <p className="text-xs text-white/60 leading-relaxed">
        <span className="text-yellow-400 font-medium">If a check fails: </span>
        {failAction}
      </p>
    </div>
  );
}
