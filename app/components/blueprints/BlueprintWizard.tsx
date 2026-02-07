"use client";

import React, { useState, useCallback } from "react";
import { RotateCcw, Download, PartyPopper, ChevronLeft, FileText } from "lucide-react";
import type { Blueprint } from "@/lib/types";
import { useBlueprintProgress } from "@/hooks/useBlueprintProgress";
import { downloadBlueprintPack, generateBlueprintMarkdown, downloadTextFile, generateClaudeProjectSetup } from "@/lib/blueprint-export";
import { ProgressBar } from "./ProgressBar";
import { StepView } from "./StepView";
import { CheckpointGate } from "./CheckpointGate";
import { RequiredInputs } from "./RequiredInputs";

interface BlueprintWizardProps {
  blueprint: Blueprint;
}

export function BlueprintWizard({ blueprint }: BlueprintWizardProps) {
  const {
    progress,
    isLoading,
    goToStep,
    markStepComplete,
    updateCheckboxes,
    resetProgress,
  } = useBlueprintProgress(blueprint.id);

  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currentStep = progress.currentStep;
  const currentStepData = blueprint.steps.find((s) => s.id === currentStep);
  const isComplete = progress.completedSteps.length === blueprint.steps.length;

  const handleInputChange = useCallback((name: string, value: string) => {
    setUserInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleStepDone = useCallback(() => {
    setShowCheckpoint(true);
  }, []);

  const handleCheckpointComplete = useCallback(() => {
    if (currentStepData) {
      markStepComplete(currentStepData.id);
      setShowCheckpoint(false);
    }
  }, [currentStepData, markStepComplete]);

  const handleCheckpointSkip = useCallback(() => {
    if (currentStepData) {
      markStepComplete(currentStepData.id);
      setShowCheckpoint(false);
    }
  }, [currentStepData, markStepComplete]);

  const handleCheckboxChange = useCallback(
    (states: boolean[]) => {
      if (currentStepData) {
        updateCheckboxes(currentStepData.id, states);
      }
    },
    [currentStepData, updateCheckboxes]
  );

  const handleReset = useCallback(() => {
    resetProgress();
    setUserInputs({});
    setShowCheckpoint(false);
    setShowResetConfirm(false);
  }, [resetProgress]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-nexus-cyan/30 border-t-nexus-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{blueprint.title}</h1>
          <p className="text-xs text-white/60 mt-1">
            {blueprint.methodology} {blueprint.version} &mdash; {blueprint.estimatedTime}
          </p>
        </div>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white/70 hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Progress */}
      <ProgressBar
        totalSteps={blueprint.steps.length}
        currentStep={currentStep}
        completedSteps={progress.completedSteps}
      />

      {/* Required inputs (show at start) */}
      {currentStep === 1 && progress.completedSteps.length === 0 && (
        <RequiredInputs
          inputs={blueprint.requiredInputs}
          values={userInputs}
          onChange={handleInputChange}
        />
      )}

      {/* Completion state */}
      {isComplete && (
        <div className="glass-modal p-8 text-center space-y-4">
          <PartyPopper className="w-12 h-12 text-nexus-cyan mx-auto" />
          <h2 className="text-xl font-bold text-white">Blueprint Complete!</h2>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            You&apos;ve completed all {blueprint.steps.length} steps. Your {blueprint.title} artifacts
            are ready for stakeholder review.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => downloadBlueprintPack(blueprint)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Full Pack
            </button>
            <button
              onClick={() => {
                const md = generateBlueprintMarkdown(blueprint);
                downloadTextFile(md, `${blueprint.slug}-blueprint.md`);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Blueprint Guide Only
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Run Again
            </button>
          </div>
        </div>
      )}

      {/* Step views */}
      {!isComplete && (
        <div className="space-y-6">
          {blueprint.steps.map((step) => (
            <div key={step.id}>
              <StepView
                step={step}
                isActive={step.id === currentStep && !showCheckpoint}
                isCompleted={progress.completedSteps.includes(step.id)}
                userInputs={userInputs}
              />

              {/* "I've completed this step" button */}
              {step.id === currentStep && !showCheckpoint && !progress.completedSteps.includes(step.id) && (
                <div className="ml-11 mt-4 flex items-center gap-3">
                  {currentStep > 1 && (
                    <button
                      onClick={() => goToStep(currentStep - 1)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white/70 transition-colors"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Previous Step
                    </button>
                  )}
                  <button
                    onClick={handleStepDone}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-nexus-cyan/20 border border-nexus-cyan/30 text-nexus-cyan text-sm font-medium hover:bg-nexus-cyan/30 transition-colors"
                  >
                    I&apos;ve completed this step — verify
                  </button>
                </div>
              )}

              {/* Checkpoint gate */}
              {step.id === currentStep && showCheckpoint && (
                <div className="ml-11 mt-4">
                  <CheckpointGate
                    title={step.checkpoint.title}
                    items={step.checkpoint.items}
                    failAction={step.checkpoint.failAction}
                    initialStates={progress.checkpointResults[step.id]}
                    onComplete={handleCheckpointComplete}
                    onSkip={handleCheckpointSkip}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reset confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-modal p-6 max-w-sm w-full mx-4 space-y-4">
            <h3 className="text-base font-semibold text-white">Reset Progress?</h3>
            <p className="text-sm text-white/60">
              This will clear all step completions and checkpoint results. You&apos;ll start from Step 1.
            </p>
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-xs text-red-300 hover:bg-red-500/30 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
