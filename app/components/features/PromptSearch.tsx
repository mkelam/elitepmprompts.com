"use client";

import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Prompt, Framework } from "@/lib/types";
import { Search, ChevronDown, X } from "lucide-react";
import { getFrameworkPhases } from "@/data/framework-phases";

interface PromptSearchProps {
  prompts: Prompt[];
  onFilter: (filtered: Prompt[]) => void;
}

export function PromptSearch({ prompts, onFilter }: PromptSearchProps) {
  const [query, setQuery] = useState("");
  const [activeFramework, setActiveFramework] = useState<Framework | "all">("all");
  const [activePhase, setActivePhase] = useState<string | "all">("all");
  const [showAllFrameworks, setShowAllFrameworks] = useState(false);

  // Get phases for the selected framework
  const frameworkPhases = useMemo(() => {
    if (activeFramework === "all") return [];
    const frameworkDef = getFrameworkPhases(activeFramework);
    return frameworkDef?.phases || [];
  }, [activeFramework]);

  // Reset phase when framework changes
  useEffect(() => {
    setActivePhase("all");
  }, [activeFramework]);

  useEffect(() => {
    let result = prompts;

    // 1. Filter by Framework
    if (activeFramework !== "all") {
      result = result.filter((p) => p.framework === activeFramework);
    }

    // 2. Filter by Phase
    if (activePhase !== "all") {
      result = result.filter((p) => p.phase === activePhase);
    }

    // 3. Filter by Search Query
    if (query.trim()) {
      const fuse = new Fuse(result, {
        keys: [
          { name: "title", weight: 2 },
          { name: "description", weight: 1 },
          { name: "tags", weight: 0.5 },
        ],
        threshold: 0.3,
      });
      result = fuse.search(query).map((res) => res.item);
    }

    onFilter(result);
  }, [query, activeFramework, activePhase, prompts, onFilter]);

  // Primary frameworks (most popular) - shown by default
  const primaryFrameworks: (Framework | "all")[] = [
    "all",
    "pmbok",
    "agile",
    "scrum",
    "kanban",
    "hybrid",
  ];

  // Secondary frameworks - shown in overflow
  const secondaryFrameworks: Framework[] = [
    "safe",
    "lean",
    "scrumban",
    "prince2",
    "six-sigma",
    "itil",
    "cobit",
  ];

  // Check if active framework is in secondary list
  const activeInSecondary = secondaryFrameworks.includes(activeFramework as Framework);

  return (
    <div className="space-y-3" role="search" aria-label="Search prompts">
      {/* Search Input */}
      <div className="relative">
        <label htmlFor="prompt-search" className="sr-only">
          Search for prompts
        </label>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          id="prompt-search"
          type="search"
          placeholder="Search prompts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="glass-input w-full text-sm py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-400/50"
          aria-describedby="search-hint"
        />
        <span id="search-hint" className="sr-only">
          Type to search through all prompts by title, description, or tags
        </span>
      </div>

      {/* Framework Filters - Collapsible */}
      <div className="space-y-2">
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter by framework"
        >
          {/* Primary Frameworks - Always visible */}
          {primaryFrameworks.map((fw) => (
            <button
              key={fw}
              onClick={() => setActiveFramework(fw)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                activeFramework === fw
                  ? "bg-nexus-cyan/20 text-nexus-cyan border border-nexus-cyan/30"
                  : "bg-white/5 text-white/60 hover:text-white/80 hover:bg-white/10 border border-transparent"
              }`}
              aria-pressed={activeFramework === fw}
              aria-label={`Filter by ${fw === "all" ? "all frameworks" : fw.replace("-", " ")}`}
            >
              {fw === "safe" ? "SAFe" : fw.replace("-", " ")}
            </button>
          ))}

          {/* Active Secondary Framework (if any) - Show inline when not expanded */}
          {activeInSecondary && !showAllFrameworks && (
            <button
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-nexus-cyan/20 text-nexus-cyan border border-nexus-cyan/30 capitalize flex items-center gap-1"
              onClick={() => setShowAllFrameworks(true)}
            >
              {activeFramework === "safe" ? "SAFe" : activeFramework.replace("-", " ")}
              <X
                className="w-3 h-3 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFramework("all");
                }}
              />
            </button>
          )}

          {/* More Button */}
          <button
            onClick={() => setShowAllFrameworks(!showAllFrameworks)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              showAllFrameworks || activeInSecondary
                ? "bg-white/10 text-white/80"
                : "bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10"
            }`}
            aria-expanded={showAllFrameworks}
            aria-label={showAllFrameworks ? "Show fewer frameworks" : "Show more frameworks"}
          >
            +{secondaryFrameworks.length}
            <ChevronDown className={`w-3 h-3 transition-transform ${showAllFrameworks ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Expanded Secondary Frameworks */}
        {showAllFrameworks && (
          <div
            className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10 animate-in slide-in-from-top-2 duration-200"
            role="group"
            aria-label="Additional framework filters"
          >
            {secondaryFrameworks.map((fw) => (
              <button
                key={fw}
                onClick={() => {
                  setActiveFramework(fw);
                  setShowAllFrameworks(false);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                  activeFramework === fw
                    ? "bg-nexus-cyan/20 text-nexus-cyan border border-nexus-cyan/30"
                    : "bg-white/5 text-white/60 hover:text-white/80 hover:bg-white/10 border border-transparent"
                }`}
                aria-pressed={activeFramework === fw}
                aria-label={`Filter by ${fw.replace("-", " ")}`}
              >
                {fw === "safe" ? "SAFe" : fw.replace("-", " ")}
              </button>
            ))}
          </div>
        )}

        {/* Phase Filters - Show when a framework is selected */}
        {activeFramework !== "all" && frameworkPhases.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 pt-2 mt-2 border-t border-white/10 animate-in slide-in-from-top-2 duration-200"
            role="group"
            aria-label={`Filter by ${activeFramework} phases`}
          >
            <span className="text-[10px] text-white/40 uppercase tracking-wider mr-1 self-center">
              Phases:
            </span>
            <button
              onClick={() => setActivePhase("all")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                activePhase === "all"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10 border border-transparent"
              }`}
              aria-pressed={activePhase === "all"}
            >
              All
            </button>
            {frameworkPhases.map((phase) => (
              <button
                key={phase.name}
                onClick={() => setActivePhase(phase.name)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  activePhase === phase.name
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10 border border-transparent"
                }`}
                aria-pressed={activePhase === phase.name}
                title={phase.description}
              >
                {phase.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
