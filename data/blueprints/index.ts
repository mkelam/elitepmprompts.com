import type { Blueprint, BlueprintSuite } from "@/lib/types";

// Import full blueprint data from individual files
export { safePiPlanning } from "./safe-pi-planning";
export { safeInspectAdapt } from "./safe-inspect-adapt";
export { safeArtSync } from "./safe-art-sync";
export { safePortfolioKanban } from "./safe-portfolio-kanban";
export { pmbokInitiationPlanning } from "./pmbok-initiation-planning";
export { pmbokExecutionMonitoring } from "./pmbok-execution-monitoring";
export { pmbokRiskProcurement } from "./pmbok-risk-procurement";
export { pmbokClosureLessons } from "./pmbok-closure-lessons";

// Re-import for use in allBlueprints array
import { safePiPlanning } from "./safe-pi-planning";
import { safeInspectAdapt } from "./safe-inspect-adapt";
import { safeArtSync } from "./safe-art-sync";
import { safePortfolioKanban } from "./safe-portfolio-kanban";
import { pmbokInitiationPlanning } from "./pmbok-initiation-planning";
import { pmbokExecutionMonitoring } from "./pmbok-execution-monitoring";
import { pmbokRiskProcurement } from "./pmbok-risk-procurement";
import { pmbokClosureLessons } from "./pmbok-closure-lessons";

// All blueprints
export const allBlueprints: Blueprint[] = [
  safePiPlanning,
  safeInspectAdapt,
  safeArtSync,
  safePortfolioKanban,
  pmbokInitiationPlanning,
  pmbokExecutionMonitoring,
  pmbokRiskProcurement,
  pmbokClosureLessons,
];

// Suite definitions
export const safeSuite: BlueprintSuite = {
  id: "safe-suite",
  name: "SAFe 6.0 Methodology Suite",
  methodology: "SAFe",
  description: "All 4 SAFe blueprints — complete coverage from PI Planning to Portfolio Management.",
  blueprints: ["safe-pi-planning", "safe-inspect-adapt", "safe-art-sync", "safe-portfolio-kanban"],
  price: 69700,
};

export const pmbokSuite: BlueprintSuite = {
  id: "pmbok-suite",
  name: "PMBOK Project Management Suite",
  methodology: "PMBOK",
  description: "All 4 PMBOK 7th Edition blueprints — complete coverage from project initiation and planning through execution monitoring, risk and procurement management, and formal closure with lessons learned.",
  blueprints: ["pmbok-initiation-planning", "pmbok-execution-monitoring", "pmbok-risk-procurement", "pmbok-closure-lessons"],
  price: 89700,
};

// Lookup helpers
export function getBlueprintBySlug(slug: string): Blueprint | undefined {
  return allBlueprints.find((b) => b.slug === slug);
}

export function getBlueprintsByMethodology(methodology: string): Blueprint[] {
  return allBlueprints.filter((b) => b.methodology === methodology);
}
