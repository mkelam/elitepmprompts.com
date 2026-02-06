"use client";

import React, { useState, useMemo } from "react";
import { pmPrompts } from "@/data/pm-prompts";
import { Prompt } from "@/lib/types";
import { PromptSearch } from "@/app/components/features/PromptSearch";
import { PromptList } from "@/app/components/features/PromptList";
import { PromptModal } from "@/app/components/features/PromptModal";
import { UnlockModal } from "@/app/components/features/UnlockModal";
import { useLicenseKey } from "@/hooks/useLicenseKey";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Lock, Unlock, Crown, Heart, Clock, Download } from "lucide-react";
import { exportLibraryToHTML } from "@/lib/export";

type FilterMode = "all" | "favorites" | "recent";

export default function Home() {
  const allPrompts = pmPrompts;

  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>(allPrompts);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const { isUnlocked, isLoading, unlock, lock } = useLicenseKey();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recentIds, addToRecent } = useRecentlyViewed();
  const { trackPromptView, trackFavoriteToggle, trackFilterModeChange, trackPremiumUnlock } = useAnalytics();

  // Count free and premium prompts
  const freeCount = allPrompts.filter(p => p.tier === "free").length;
  const premiumCount = allPrompts.filter(p => p.tier === "premium").length;

  // Get prompts based on filter mode
  const displayPrompts = useMemo(() => {
    let basePrompts = filteredPrompts;

    if (filterMode === "favorites") {
      basePrompts = allPrompts.filter(p => favorites.includes(p.id));
    } else if (filterMode === "recent") {
      basePrompts = recentIds
        .map(id => allPrompts.find(p => p.id === id))
        .filter((p): p is Prompt => p !== undefined);
    }

    return basePrompts;
  }, [filteredPrompts, filterMode, favorites, recentIds, allPrompts]);

  // Handle prompt selection (track recently viewed and analytics)
  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    addToRecent(prompt.id);
    trackPromptView(prompt.id, prompt.title, prompt.framework, prompt.tier);
  };

  // Handle filter mode change with analytics
  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    trackFilterModeChange(mode);
  };

  // Handle favorite toggle with analytics
  const handleToggleFavorite = (promptId: string) => {
    const action = isFavorite(promptId) ? "remove" : "add";
    toggleFavorite(promptId);
    trackFavoriteToggle(promptId, action);
  };

  // Handle premium unlock with analytics
  const handleUnlock = (key: string) => {
    const success = unlock(key);
    trackPremiumUnlock(success);
    return success;
  };

  return (
    <>
      {/* Skip Link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main
        id="main-content"
        className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-6"
        role="main"
      >
        {/* Compact Header with Integrated Actions */}
        <header className="glass-chrome p-4 sm:p-6 space-y-2 relative z-30">
          {/* Top Row: Title + Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nexus-cyan via-white to-nexus-violet pb-1 uppercase tracking-tight">
                The Project Manager&apos;s Nexus
              </h1>
              <p className="text-sm md:text-base text-slate-400 font-light mt-1">
                The Ultimate Command Center for <span className="text-nexus-cyan font-medium">Enterprise Execution</span>
              </p>
            </div>

            {/* Action Buttons - Right aligned on desktop */}
            {!isLoading && (
              <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2">
                {isUnlocked ? (
                  <button
                    onClick={() => lock()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-green-500/40 text-green-300 text-xs hover:bg-black/60 hover:border-green-500/60 transition-colors"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Premium Active</span>
                    <span className="sm:hidden">Pro</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowUnlockModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-yellow-500/40 text-yellow-300 text-xs hover:bg-black/60 hover:border-yellow-500/60 transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Unlock Premium</span>
                    <span className="sm:hidden">Unlock</span>
                  </button>
                )}

                {/* Download Library Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-blue-500/40 text-blue-300 text-xs hover:bg-black/60 hover:border-blue-500/60 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export</span>
                  </button>

                  {/* Download Dropdown */}
                  {showDownloadMenu && (
                    <div className="absolute top-full mt-2 right-0 z-50 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden min-w-[200px]">
                      <button
                        onClick={async () => {
                          setShowDownloadMenu(false);
                          await exportLibraryToHTML(allPrompts);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <span className="w-8 h-8 rounded-lg bg-black/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                          🌐
                        </span>
                        <div>
                          <div className="font-medium">Interactive HTML</div>
                          <div className="text-xs text-white/40">Offline-ready web app</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Methodology Tags - Subtle bottom line */}
          <p className="text-[10px] sm:text-xs text-slate-500/80 font-mono tracking-wide text-center lg:text-left">
            Agile • Scrum • Kanban • SAFe • Waterfall • PRINCE2 • PMBOK • ITIL
          </p>
        </header>

      {/* Unified Search & Filter Toolbar */}
      <section className="glass-chrome p-3 sm:p-4">
        {/* Search Row with View Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {/* Search Input - Full Width */}
          <div className="flex-1">
            <PromptSearch prompts={allPrompts} onFilter={setFilteredPrompts} />
          </div>

          {/* View Mode Tabs - Compact */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg bg-black/40 border border-white/10 self-center sm:self-auto"
            role="tablist"
            aria-label="Filter prompt view"
          >
            <button
              onClick={() => handleFilterModeChange("all")}
              role="tab"
              aria-selected={filterMode === "all"}
              aria-controls="prompts-panel"
              className={`min-h-[36px] px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                filterMode === "all"
                  ? "bg-black/60 text-blue-200 border border-blue-500/40"
                  : "text-white/60 hover:text-white/80 hover:bg-black/30"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterModeChange("favorites")}
              role="tab"
              aria-selected={filterMode === "favorites"}
              aria-controls="prompts-panel"
              className={`min-h-[36px] px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                filterMode === "favorites"
                  ? "bg-black/60 text-pink-200 border border-pink-500/40"
                  : "text-white/60 hover:text-white/80 hover:bg-black/30"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${filterMode === "favorites" ? "fill-pink-300" : ""}`} aria-hidden="true" />
              {favorites.length > 0 && (
                <span className="text-[10px]" aria-label={`${favorites.length} favorites`}>
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleFilterModeChange("recent")}
              role="tab"
              aria-selected={filterMode === "recent"}
              aria-controls="prompts-panel"
              className={`min-h-[36px] px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                filterMode === "recent"
                  ? "bg-black/60 text-purple-200 border border-purple-500/40"
                  : "text-white/60 hover:text-white/80 hover:bg-black/30"
              }`}
            >
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {recentIds.length > 0 && (
                <span className="text-[10px]" aria-label={`${recentIds.length} recent`}>
                  {recentIds.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section id="prompts-panel" role="tabpanel" aria-label={`${filterMode === "all" ? "All" : filterMode === "favorites" ? "Favorite" : "Recent"} prompts`}>
        {/* Compact Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 px-1">
          <div className="flex items-center gap-2">
            {filterMode === "favorites" && <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />}
            {filterMode === "recent" && <Clock className="w-3.5 h-3.5 text-purple-400" />}
            <span className="text-white/70 text-sm font-medium">
              {displayPrompts.length} {filterMode === "all" ? "Prompts" : filterMode === "favorites" ? "Favorites" : "Recent"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/50">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              {freeCount} Free
            </span>
            <span className="flex items-center gap-1">
              {isUnlocked ? (
                <Unlock className="w-3 h-3 text-green-400" />
              ) : (
                <Lock className="w-3 h-3 text-yellow-400/70" />
              )}
              {premiumCount} Premium
            </span>
          </div>
        </div>

        {/* Empty State for Favorites/Recent */}
        {displayPrompts.length === 0 && filterMode !== "all" && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-3">
              {filterMode === "favorites" ? (
                <Heart className="w-6 h-6 text-white/30" />
              ) : (
                <Clock className="w-6 h-6 text-white/30" />
              )}
            </div>
            <p className="text-white/50 text-base mb-1">
              {filterMode === "favorites" ? "No favorites yet" : "No recently viewed"}
            </p>
            <p className="text-white/30 text-xs max-w-xs mx-auto">
              {filterMode === "favorites"
                ? "Click the heart on any prompt to save it here."
                : "Prompts you view will appear here."}
            </p>
            <button
              onClick={() => setFilterMode("all")}
              className="mt-3 text-nexus-cyan hover:text-nexus-cyan/80 text-xs inline-flex items-center gap-1"
            >
              Browse all prompts
            </button>
          </div>
        )}

        {displayPrompts.length > 0 && (
          <PromptList
            prompts={displayPrompts}
            onSelect={handleSelectPrompt}
            isUnlocked={isUnlocked}
            onUnlockClick={() => setShowUnlockModal(true)}
            favorites={favorites}
          />
        )}
      </section>

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
          isFavorite={isFavorite(selectedPrompt.id)}
          onToggleFavorite={() => handleToggleFavorite(selectedPrompt.id)}
        />
      )}

      {/* Unlock Modal */}
      {showUnlockModal && (
        <UnlockModal
          onClose={() => setShowUnlockModal(false)}
          onUnlock={handleUnlock}
        />
      )}
      </main>
    </>
  );
}
