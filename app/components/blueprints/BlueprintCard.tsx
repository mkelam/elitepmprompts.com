import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Layers, FileCheck } from "lucide-react";
import type { Blueprint } from "@/lib/types";

interface BlueprintCardProps {
  blueprint: Blueprint;
  isPurchased: boolean;
}

export function BlueprintCard({ blueprint, isPurchased }: BlueprintCardProps) {
  return (
    <Link
      href={`/blueprints/${blueprint.slug}`}
      className="glass-content p-5 group hover:border-nexus-cyan/30 transition-all block"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20">
              {blueprint.methodology}
            </span>
            <span className="text-xs text-white/50">v{blueprint.version}</span>
          </div>
          <h3 className="text-base font-semibold text-white group-hover:text-nexus-cyan transition-colors">
            {blueprint.title}
          </h3>
        </div>
        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-nexus-cyan transition-colors flex-shrink-0 mt-1" />
      </div>

      {/* Subtitle */}
      <p className="text-xs text-white/60 leading-relaxed mb-3">
        {blueprint.subtitle}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center gap-1 text-xs text-white/50">
          <Layers className="w-3 h-3" />
          {blueprint.stepCount} steps
        </span>
        <span className="flex items-center gap-1 text-xs text-white/50">
          <Clock className="w-3 h-3" />
          {blueprint.estimatedTime}
        </span>
        <span className="flex items-center gap-1 text-xs text-white/50">
          <FileCheck className="w-3 h-3" />
          {blueprint.artifactsProduced.length} artifacts
        </span>
      </div>

      {/* Artifacts preview */}
      <div className="flex flex-wrap gap-1">
        {blueprint.artifactsProduced.slice(0, 4).map((artifact) => (
          <span
            key={artifact}
            className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-white/50"
          >
            {artifact}
          </span>
        ))}
        {blueprint.artifactsProduced.length > 4 && (
          <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-white/30">
            +{blueprint.artifactsProduced.length - 4} more
          </span>
        )}
      </div>

      {/* Footer: price or access */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        {isPurchased ? (
          <span className="text-xs text-green-400 font-medium">Purchased — Run Blueprint</span>
        ) : (
          <span className="text-xs text-white/50">
            <span className="text-white font-semibold">${(blueprint.price / 100).toFixed(0)}</span>
            {" "}one-time
          </span>
        )}
      </div>
    </Link>
  );
}
