"use client";

import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Prompt, PromptCategory } from "@/lib/types";
import { GlassButton } from "@/app/components/ui/GlassButton";
import { Search, ChevronDown, X } from "lucide-react";

interface PromptSearchProps {
  prompts: Prompt[];
  onFilter: (filtered: Prompt[]) => void;
}

export function PromptSearch({ prompts, onFilter }: PromptSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "all">("all");
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    let result = prompts;

    // 1. Filter by Category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by Search Query
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
  }, [query, activeCategory, prompts, onFilter]);

  // Primary categories (most popular) - shown by default
  const primaryCategories: (PromptCategory | "all")[] = [
    "all",
    "agile",
    "scrum",
    "kanban",
    "hybrid",
    "waterfall",
  ];

  // Secondary categories - shown in overflow
  const secondaryCategories: PromptCategory[] = [
    "safe",
    "lean",
    "scrumban",
    "prince2",
    "six-sigma",
    "pmbok",
    "itil",
    "cobit",
  ];

  // Check if active category is in secondary list
  const activeInSecondary = secondaryCategories.includes(activeCategory as PromptCategory);

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

      {/* Category Filters - Collapsible */}
      <div className="space-y-2">
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter by category"
        >
          {/* Primary Categories - Always visible */}
          {primaryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                activeCategory === cat
                  ? "bg-nexus-cyan/20 text-nexus-cyan border border-nexus-cyan/30"
                  : "bg-white/5 text-white/60 hover:text-white/80 hover:bg-white/10 border border-transparent"
              }`}
              aria-pressed={activeCategory === cat}
              aria-label={`Filter by ${cat === "all" ? "all categories" : cat.replace("-", " ")}`}
            >
              {cat === "safe" ? "SAFe" : cat.replace("-", " ")}
            </button>
          ))}

          {/* Active Secondary Category (if any) - Show inline when not expanded */}
          {activeInSecondary && !showAllCategories && (
            <button
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-nexus-cyan/20 text-nexus-cyan border border-nexus-cyan/30 capitalize flex items-center gap-1"
              onClick={() => setShowAllCategories(true)}
            >
              {activeCategory.replace("-", " ")}
              <X
                className="w-3 h-3 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCategory("all");
                }}
              />
            </button>
          )}

          {/* More Button */}
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              showAllCategories || activeInSecondary
                ? "bg-white/10 text-white/80"
                : "bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10"
            }`}
            aria-expanded={showAllCategories}
            aria-label={showAllCategories ? "Show fewer categories" : "Show more categories"}
          >
            +{secondaryCategories.length}
            <ChevronDown className={`w-3 h-3 transition-transform ${showAllCategories ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Expanded Secondary Categories */}
        {showAllCategories && (
          <div
            className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10 animate-in slide-in-from-top-2 duration-200"
            role="group"
            aria-label="Additional category filters"
          >
            {secondaryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAllCategories(false);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                  activeCategory === cat
                    ? "bg-nexus-cyan/20 text-nexus-cyan border border-nexus-cyan/30"
                    : "bg-white/5 text-white/60 hover:text-white/80 hover:bg-white/10 border border-transparent"
                }`}
                aria-pressed={activeCategory === cat}
                aria-label={`Filter by ${cat.replace("-", " ")}`}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
