"use client";

import React from "react";
import { Clock, CheckCircle2, Circle } from "lucide-react";
import type { BlueprintStep } from "@/lib/types";
import { CopyPromptButton } from "./CopyPromptButton";
import { ArtifactPreview } from "./ArtifactPreview";

interface StepViewProps {
  step: BlueprintStep;
  isActive: boolean;
  isCompleted: boolean;
  userInputs: Record<string, string>;
}

function substituteVariables(prompt: string, inputs: Record<string, string>): string {
  let result = prompt;
  for (const [key, value] of Object.entries(inputs)) {
    if (value.trim()) {
      // Replace common placeholder patterns
      const patterns = [
        new RegExp(`\\[paste your ${key.toLowerCase()} here\\]`, "gi"),
        new RegExp(`\\[paste ${key.toLowerCase()} here\\]`, "gi"),
        new RegExp(`\\[${key.toLowerCase()}\\]`, "gi"),
        new RegExp(`\\[your ${key.toLowerCase()}\\]`, "gi"),
      ];
      for (const pattern of patterns) {
        result = result.replace(pattern, value);
      }
    }
  }
  return result;
}

export function StepView({ step, isActive, isCompleted, userInputs }: StepViewProps) {
  const processedPrompt = substituteVariables(step.prompt, userInputs);

  return (
    <div
      className={`space-y-4 transition-opacity ${
        isActive ? "opacity-100" : "opacity-50 pointer-events-none"
      }`}
    >
      {/* Step header */}
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
            isCompleted
              ? "bg-green-500/20 border border-green-500/30 text-green-300"
              : isActive
              ? "bg-nexus-cyan/20 border border-nexus-cyan/30 text-nexus-cyan"
              : "bg-white/5 border border-white/10 text-white/30"
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            step.id
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white">{step.title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-white/60">
              <Clock className="w-3 h-3" />
              {step.estimatedTime}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Purpose */}
      <p className="text-sm text-white/60 leading-relaxed pl-0 sm:pl-11">{step.purpose}</p>

      {/* Prompt block */}
      {isActive && (
        <div className="ml-0 sm:ml-11 space-y-3">
          <div className="glass-content p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Prompt</span>
              <CopyPromptButton text={processedPrompt} />
            </div>
            <pre className="text-xs text-white/70 leading-relaxed whitespace-pre-wrap font-mono bg-black/30 rounded-lg p-3 max-h-96 overflow-y-auto">
              {processedPrompt}
            </pre>
          </div>

          {/* Expected output */}
          <div className="px-3">
            <p className="text-xs text-white/60">
              <span className="text-white/80 font-medium">Expected output: </span>
              {step.expectedOutput}
            </p>
          </div>

          {/* Artifacts this step produces */}
          {step.artifacts.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                Artifacts Produced
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {step.artifacts.map((artifact) => (
                  <ArtifactPreview key={artifact.name} artifact={artifact} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
