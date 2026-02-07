"use client";

import React from "react";
import { ClipboardList } from "lucide-react";

interface RequiredInputsProps {
  inputs: {
    name: string;
    description: string;
    format: string;
  }[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function RequiredInputs({ inputs, values, onChange }: RequiredInputsProps) {
  return (
    <div className="glass-modal p-5 space-y-4">
      <div className="flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-nexus-cyan" />
        <h3 className="text-sm font-semibold text-white">Before You Start</h3>
      </div>
      <p className="text-xs text-white/60 leading-relaxed">
        Gather this information before running the blueprint. The quality of your outputs depends directly on the quality of these inputs.
      </p>

      <div className="space-y-3">
        {inputs.map((input) => (
          <div key={input.name} className="space-y-1.5">
            <label className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/80">{input.name}</span>
              <span className="text-xs text-white/50 font-mono">{input.format}</span>
            </label>
            <p className="text-xs text-white/60">{input.description}</p>
            <textarea
              value={values[input.name] || ""}
              onChange={(e) => onChange(input.name, e.target.value)}
              placeholder={`Enter your ${input.name.toLowerCase()}...`}
              rows={3}
              className="w-full glass-input-field px-3 py-2 text-sm text-white/80 placeholder:text-white/40 resize-y focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
