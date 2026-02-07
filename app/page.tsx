import Link from "next/link";
import { ArrowRight } from "lucide-react";

const safeBlueprints = [
  { title: "PI Planning Copilot", steps: 7, slug: "safe-pi-planning" },
  { title: "Inspect & Adapt Engine", steps: 5, slug: "safe-inspect-adapt" },
  { title: "ART Sync Orchestrator", steps: 4, slug: "safe-art-sync" },
  { title: "Portfolio Kanban Builder", steps: 5, slug: "safe-portfolio-kanban" },
];

const agileBlueprints = [
  { title: "Sprint Planning & Refinement", steps: 6, slug: "agile-sprint-planning" },
  { title: "Sprint Review & Retro Engine", steps: 5, slug: "agile-sprint-review-retro" },
  { title: "Release Planning & Roadmap", steps: 5, slug: "agile-release-planning" },
  { title: "Kanban Flow Optimizer", steps: 5, slug: "agile-kanban-optimization" },
];

const pmbokBlueprints = [
  { title: "Initiation & Planning Copilot", steps: 7, slug: "pmbok-initiation-planning" },
  { title: "Execution & Monitoring Copilot", steps: 5, slug: "pmbok-execution-monitoring" },
  { title: "Risk & Procurement Manager", steps: 5, slug: "pmbok-risk-procurement" },
  { title: "Closure & Lessons Learned", steps: 5, slug: "pmbok-closure-lessons" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[85vh] px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white text-shadow-hero">
            Agentic Blueprints for
            <br />
            Enterprise Project Managers
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto leading-relaxed font-light">
            Multi-step AI workflows that produce complete, methodology-compliant
            artifacts in 60 minutes instead of days.
          </p>

          <div className="pt-4">
            <Link
              href="/blueprints"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-nexus-cyan/20"
            >
              Explore Blueprints
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blueprint Showcase */}
      <section className="px-6 py-24 sm:py-32">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* SAFe Suite */}
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-nexus-cyan/70">
                SAFe 6.0 Methodology Suite
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-shadow-heading">
                Four blueprints. Complete ceremony coverage.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {safeBlueprints.map((bp) => (
                <Link
                  key={bp.slug}
                  href={`/blueprints/${bp.slug}`}
                  className="glass-content p-6 group hover:border-nexus-cyan/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                >
                  <h3 className="text-sm font-semibold text-white/90 group-hover:text-nexus-cyan transition-colors leading-snug">
                    {bp.title}
                  </h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs text-white/30 font-medium">
                      {bp.steps} steps
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-nexus-cyan group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Agile Suite */}
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/70">
                Agile &amp; Scrum
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-shadow-heading">
                Four blueprints. Sprint to release.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {agileBlueprints.map((bp) => (
                <Link
                  key={bp.slug}
                  href={`/blueprints/${bp.slug}`}
                  className="glass-content p-6 group hover:border-emerald-400/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                >
                  <h3 className="text-sm font-semibold text-white/90 group-hover:text-emerald-400 transition-colors leading-snug">
                    {bp.title}
                  </h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs text-white/30 font-medium">
                      {bp.steps} steps
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PMBOK Suite */}
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-nexus-violet/70">
                PMBOK 7th Edition
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-shadow-heading">
                Four blueprints. Full project lifecycle.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {pmbokBlueprints.map((bp) => (
                <Link
                  key={bp.slug}
                  href={`/blueprints/${bp.slug}`}
                  className="glass-content p-6 group hover:border-nexus-violet/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                >
                  <h3 className="text-sm font-semibold text-white/90 group-hover:text-nexus-violet transition-colors leading-snug">
                    {bp.title}
                  </h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs text-white/30 font-medium">
                      {bp.steps} steps
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-nexus-violet group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-24 sm:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="glass-content p-10 sm:p-14 text-center space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-shadow-heading">
              Ready to transform how you deliver?
            </h2>
            <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
              Start with 50+ free prompts or go straight to the blueprints.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/blueprints"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                View Blueprints
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/prompts"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white/40 text-sm font-medium hover:text-white/70 transition-colors"
              >
                Free Prompt Library
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
