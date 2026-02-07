import React from "react";
import { Table2, List, FileText, Grid3X3 } from "lucide-react";
import type { ArtifactTemplate } from "@/lib/types";

interface ArtifactPreviewProps {
  artifact: ArtifactTemplate;
}

const formatIcons = {
  table: Table2,
  list: List,
  text: FileText,
  matrix: Grid3X3,
};

export function ArtifactPreview({ artifact }: ArtifactPreviewProps) {
  const Icon = formatIcons[artifact.format];

  return (
    <div className="glass-content p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-nexus-violet/20 border border-nexus-violet/30 flex items-center justify-center">
          <Icon className="w-3 h-3 text-nexus-violet" />
        </div>
        <span className="text-xs font-medium text-white/80">{artifact.name}</span>
        <span className="px-1.5 py-0.5 rounded text-xs bg-white/5 text-white/60 uppercase tracking-wider">
          {artifact.format}
        </span>
      </div>

      <p className="text-xs text-white/60 leading-relaxed">{artifact.description}</p>

      {/* Column preview for tables */}
      {artifact.columns && artifact.columns.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {artifact.columns.map((col) => (
            <span
              key={col}
              className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-white/50 font-mono"
            >
              {col}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
