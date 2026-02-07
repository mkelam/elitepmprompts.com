import type { Blueprint, BlueprintSuite } from "@/lib/types";

// Import full blueprint data from individual files
export { safePiPlanning } from "./safe-pi-planning";
export { safeInspectAdapt } from "./safe-inspect-adapt";
export { safeArtSync } from "./safe-art-sync";
export { safePortfolioKanban } from "./safe-portfolio-kanban";

// Re-import for use in allBlueprints array
import { safePiPlanning } from "./safe-pi-planning";
import { safeInspectAdapt } from "./safe-inspect-adapt";
import { safeArtSync } from "./safe-art-sync";
import { safePortfolioKanban } from "./safe-portfolio-kanban";

// All blueprints
export const allBlueprints: Blueprint[] = [
  safePiPlanning,
  safeInspectAdapt,
  safeArtSync,
  safePortfolioKanban,
];

// Suite definition
export const safeSuite: BlueprintSuite = {
  id: "safe-suite",
  name: "SAFe 6.0 Methodology Suite",
  methodology: "SAFe",
  description: "All 4 SAFe blueprints — complete coverage from PI Planning to Portfolio Management.",
  blueprints: ["safe-pi-planning", "safe-inspect-adapt", "safe-art-sync", "safe-portfolio-kanban"],
  price: 69700,
};

// Lookup helpers
export function getBlueprintBySlug(slug: string): Blueprint | undefined {
  return allBlueprints.find((b) => b.slug === slug);
}

export function getBlueprintsByMethodology(methodology: string): Blueprint[] {
  return allBlueprints.filter((b) => b.methodology === methodology);
}
