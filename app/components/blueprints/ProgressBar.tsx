import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  completedSteps: number[];
}

export function ProgressBar({ totalSteps, currentStep, completedSteps }: ProgressBarProps) {
  const progressPercent = (completedSteps.length / totalSteps) * 100;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-nexus-cyan to-nexus-violet transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs text-white/50 font-mono whitespace-nowrap">
          {completedSteps.length}/{totalSteps}
        </span>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = completedSteps.includes(stepNum);
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={stepNum}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isCompleted
                  ? "bg-green-500/15 text-green-300 border border-green-500/20"
                  : isCurrent
                  ? "bg-nexus-cyan/15 text-nexus-cyan border border-nexus-cyan/30"
                  : "bg-white/5 text-white/50 border border-white/10"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <Circle className="w-3 h-3" />
              )}
              <span>Step {stepNum}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
