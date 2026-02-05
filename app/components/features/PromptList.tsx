import React from "react";
import { Prompt } from "@/lib/types";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { Lock, Crown, Heart } from "lucide-react";

interface PromptListProps {
  prompts: Prompt[];
  onSelect: (prompt: Prompt) => void;
  isUnlocked: boolean;
  onUnlockClick: () => void;
  favorites: string[];
}

export function PromptList({
  prompts,
  onSelect,
  isUnlocked,
  onUnlockClick,
  favorites
}: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-12 text-white/50">
        <p className="text-base">No prompts found matching your criteria.</p>
      </div>
    );
  }

  const handleClick = (prompt: Prompt) => {
    if (prompt.tier === "premium" && !isUnlocked) {
      onUnlockClick();
    } else {
      onSelect(prompt);
    }
  };

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
      role="list"
      aria-label="Prompt templates"
    >
      {prompts.map((prompt) => {
        const isPremiumLocked = prompt.tier === "premium" && !isUnlocked;
        const isFavorite = favorites.includes(prompt.id);

        return (
          <GlassCard
            key={prompt.id}
            role="listitem"
            tabIndex={0}
            className={`cursor-pointer group flex flex-col h-full hover:scale-[1.01] relative focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-1 focus:ring-offset-transparent p-4 ${
              isPremiumLocked ? "opacity-90" : ""
            }`}
            onClick={() => handleClick(prompt)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(prompt);
              }
            }}
            aria-label={`${prompt.title}${isPremiumLocked ? " - Premium locked, click to unlock" : ""}${isFavorite ? " - Favorited" : ""}`}
          >
            {/* Top Row: Category + Status Badges */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/5 text-white/50 uppercase tracking-wide">
                {prompt.category === "safe" ? "SAFe" : prompt.category}
              </span>
              <div className="flex items-center gap-1">
                {/* Favorite Indicator */}
                {isFavorite && !isPremiumLocked && (
                  <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                )}
                {/* Premium Badge */}
                {prompt.tier === "premium" && (
                  isPremiumLocked ? (
                    <Lock className="w-3 h-3 text-yellow-400/70" />
                  ) : (
                    <Crown className="w-3 h-3 text-green-400" />
                  )
                )}
              </div>
            </div>

            <h3 className={`text-sm font-semibold mb-1 line-clamp-2 transition-colors ${
              isPremiumLocked
                ? "text-white/60"
                : "text-white/90 group-hover:text-nexus-cyan"
            }`}>
              {prompt.title}
            </h3>
            <p className={`text-xs line-clamp-2 mb-3 flex-1 ${
              isPremiumLocked ? "text-white/30" : "text-white/50"
            }`}>
              {isPremiumLocked
                ? "Premium content - unlock to access"
                : prompt.description
              }
            </p>

            {/* Footer: Time saved + Framework tags */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] text-white/40">{prompt.estimatedTimeSaved}</span>
              {!isPremiumLocked && prompt.frameworks.length > 0 && (
                <div className="flex gap-1 overflow-hidden">
                  {prompt.frameworks.slice(0, 2).map(fw => (
                    <span key={fw} className="text-[9px] px-1 py-0.5 rounded bg-nexus-cyan/10 text-nexus-cyan/70 truncate max-w-[60px]">
                      {fw}
                    </span>
                  ))}
                  {prompt.frameworks.length > 2 && (
                    <span className="text-[9px] text-white/30">+{prompt.frameworks.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
