import React from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Clock,
  FileCheck,
  Shield,
  CheckCircle2,
  BookOpen,
  Target,
  Layers,
  TrendingUp,
} from "lucide-react";

const blueprintPreviews = [
  {
    title: "PI Planning Copilot",
    steps: 7,
    time: "60–90 min",
    artifacts: "PI Board, dependency map, ROAM risk register, team PI Objectives, confidence vote",
    slug: "safe-pi-planning",
  },
  {
    title: "Inspect & Adapt Engine",
    steps: 5,
    time: "45–60 min",
    artifacts: "PI metrics dashboard, problem-solving workshop, improvement backlog",
    slug: "safe-inspect-adapt",
  },
  {
    title: "ART Sync Orchestrator",
    steps: 4,
    time: "30–45 min",
    artifacts: "Dependency status, impediment tracker, PI objectives progress report",
    slug: "safe-art-sync",
  },
  {
    title: "Portfolio Kanban Builder",
    steps: 5,
    time: "45–60 min",
    artifacts: "Epic hypotheses, lean business cases, portfolio Kanban, WIP analysis",
    slug: "safe-portfolio-kanban",
  },
];

const comparisonRows = [
  {
    dimension: "Interaction",
    prompt: "One-shot. Paste, get output, done.",
    blueprint: "5-8 linked steps with checkpoints and quality gates.",
  },
  {
    dimension: "Output",
    prompt: "Text blob you reformat into a deliverable.",
    blueprint: "Complete PM artifacts ready for stakeholder review.",
  },
  {
    dimension: "Methodology",
    prompt: "References the framework. May use correct terms.",
    blueprint: "Enforces the framework. Every step maps to a methodology phase.",
  },
  {
    dimension: "Time Saved",
    prompt: "Minutes on a single prompt response.",
    blueprint: "Hours to days of manual facilitation replaced.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 pt-10 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-cyan/10 border border-nexus-cyan/30">
            <span className="w-1.5 h-1.5 rounded-full bg-nexus-cyan animate-pulse" />
            <span className="text-xs text-nexus-cyan font-medium">SAFe 6.0 Blueprints — Now Available</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-shadow-hero">
            <span className="text-white">Stop Prompting.</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-nexus-cyan to-nexus-violet">
              Start Producing Artifacts.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Agentic AI blueprints that walk you through complete PM workflows step-by-step.
            Produce methodology-compliant PI Planning packs, risk registers, and governance artifacts
            in <span className="text-nexus-cyan font-medium">60–90 minutes</span> instead of days.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/blueprints"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              View SAFe Blueprints
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Browse Free Prompts
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-4 pt-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              SAFe 6.0 Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              Model-Agnostic (Claude, ChatGPT, Gemini)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              50+ Free PM Prompts
            </span>
          </div>
        </div>
      </section>

      {/* Value Proposition — Prompts vs Blueprints */}
      <section className="px-4 py-10 sm:py-12 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Beyond Prompts. Beyond Templates.
            </h2>
            <p className="text-sm text-white/60 max-w-xl mx-auto">
              A prompt gives you text. A blueprint gives you a complete, methodology-compliant deliverable.
            </p>
          </div>

          {/* Stacked cards on mobile, table on md+ */}
          <div className="hidden md:block glass-content p-1 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/60 text-xs font-medium uppercase tracking-wider w-1/4">Dimension</th>
                  <th className="text-left px-4 py-3 text-white/60 text-xs font-medium uppercase tracking-wider w-[37.5%]">Static Prompt</th>
                  <th className="text-left px-4 py-3 text-nexus-cyan text-xs font-medium uppercase tracking-wider w-[37.5%]">Agentic Blueprint</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.dimension} className={i < comparisonRows.length - 1 ? "border-b border-white/5" : ""}>
                    <td className="px-4 py-3 text-white/70 font-medium">{row.dimension}</td>
                    <td className="px-4 py-3 text-white/60">{row.prompt}</td>
                    <td className="px-4 py-3 text-white/80">{row.blueprint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stacked cards on mobile */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((row) => (
              <div key={row.dimension} className="glass-content p-4 space-y-2">
                <h3 className="text-sm font-semibold text-white">{row.dimension}</h3>
                <div className="space-y-1.5">
                  <p className="text-xs text-white/60">
                    <span className="text-white/50 font-medium">Prompt: </span>{row.prompt}
                  </p>
                  <p className="text-xs text-white/80">
                    <span className="text-nexus-cyan font-medium">Blueprint: </span>{row.blueprint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blueprint Showcase */}
      <section className="px-4 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-violet/10 border border-nexus-violet/30 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-nexus-violet" />
              <span className="text-xs text-nexus-violet font-medium">SAFe 6.0 Methodology Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              4 Blueprints. Complete SAFe Coverage.
            </h2>
            <p className="text-sm text-white/60 max-w-xl mx-auto">
              Each blueprint produces real, stakeholder-ready artifacts — not explanatory text.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blueprintPreviews.map((bp) => (
              <Link
                key={bp.slug}
                href={`/blueprints/${bp.slug}`}
                className="glass-content p-5 group hover:border-nexus-cyan/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-white group-hover:text-nexus-cyan transition-colors">
                    {bp.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-nexus-cyan transition-colors" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-white/50">
                    <Layers className="w-3 h-3" />
                    {bp.steps} steps
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/50">
                    <Clock className="w-3 h-3" />
                    {bp.time}
                  </span>
                </div>

                <p className="text-xs text-white/60 leading-relaxed">
                  <span className="text-white/80 font-medium">Artifacts: </span>
                  {bp.artifacts}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/blueprints"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              View All Blueprints
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-10 sm:py-12 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How Blueprints Work
            </h2>
            <p className="text-sm text-white/60 max-w-lg mx-auto">
              AI-assisted, human-validated. You stay in control at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Target,
                title: "1. Load Context",
                desc: "Set up your AI with the methodology primer and your organizational data.",
              },
              {
                icon: Layers,
                title: "2. Run Steps",
                desc: "Copy each step's prompt into your AI tool. Get structured artifact outputs.",
              },
              {
                icon: Shield,
                title: "3. Verify at Gates",
                desc: "Check the output against the checkpoint criteria before proceeding.",
              },
              {
                icon: FileCheck,
                title: "4. Ship Artifacts",
                desc: "Download or copy complete, stakeholder-ready PM deliverables.",
              },
            ].map((step) => (
              <div key={step.title} className="glass-content p-4 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-nexus-cyan/20 to-nexus-violet/20 border border-white/10">
                  <step.icon className="w-5 h-5 text-nexus-cyan" />
                </div>
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Anchor */}
      <section className="px-4 py-10 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="glass-content p-6 sm:p-8 text-center space-y-4 border-nexus-cyan/20">
            <TrendingUp className="w-8 h-8 text-nexus-cyan mx-auto" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Replace 2-3 Days of Manual Facilitation
            </h2>
            <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
              A typical PI Planning session takes a team of 6 across 2 full days — roughly 96 person-hours
              at $75/hr loaded cost. That&apos;s <span className="text-white font-medium">$7,200 per session</span>.
              A blueprint produces equivalent artifacts in 90 minutes for <span className="text-nexus-cyan font-medium">$297</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/prompts"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Try Free Prompts First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
