"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  BookOpen,
  Layers,
  Crown,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { allBlueprints, safeSuite } from "@/data/blueprints";
import { initiatePayFastPayment } from "@/lib/payfast";

const tiers = [
  {
    id: "free",
    name: "Free Prompt Library",
    price: "$0",
    period: "forever",
    description: "50+ methodology-aligned AI prompts across 12 PM frameworks.",
    icon: FileText,
    accent: "green",
    cta: "Browse Free Prompts",
    href: "/prompts",
    features: [
      "50+ PM prompts (PMBOK, Agile, SAFe, PRINCE2, COBIT, ITIL...)",
      "Fuzzy search & framework filtering",
      "Variable substitution templates",
      "Export to Excel, HTML, JSON, Markdown",
      "Offline-first PWA — works without internet",
    ],
  },
  {
    id: "single",
    name: "Blueprint Single",
    price: "$297",
    period: "one-time",
    description: "One complete agentic blueprint of your choice.",
    icon: BookOpen,
    accent: "cyan",
    cta: "Choose a Blueprint",
    href: "/blueprints",
    features: [
      "1 multi-step agentic blueprint",
      "Step-by-step interactive wizard",
      "Checkpoint quality gates at every step",
      "Complete artifact templates",
      "Universal markdown guide + Claude Project setup",
      "Lifetime access & methodology updates",
    ],
  },
  {
    id: "suite",
    name: "SAFe Methodology Suite",
    price: "$697",
    period: "one-time",
    description: "All 4 SAFe blueprints — complete methodology coverage.",
    icon: Layers,
    accent: "violet",
    cta: "Get the Suite",
    href: "#",
    popular: true,
    features: [
      "All 4 SAFe 6.0 blueprints:",
      "  — PI Planning Copilot (7 steps)",
      "  — Inspect & Adapt Engine (5 steps)",
      "  — ART Sync Orchestrator (4 steps)",
      "  — Portfolio Kanban Builder (5 steps)",
      "21 total steps, 28+ artifacts",
      "Save $491 vs buying individually",
      "Lifetime access & methodology updates",
    ],
  },
];

export default function PricingPage() {
  const [selectedBlueprint, setSelectedBlueprint] = useState("");

  function handleBuySuite() {
    initiatePayFastPayment({
      itemName: safeSuite.name,
      itemDescription: "All 4 SAFe 6.0 blueprints — complete methodology coverage",
      amount: safeSuite.price / 100,
      blueprintId: safeSuite.id,
      returnPath: "/blueprints",
    });
  }

  function handleBuySingle(blueprintId: string) {
    const bp = allBlueprints.find((b) => b.id === blueprintId);
    if (!bp) return;
    initiatePayFastPayment({
      itemName: bp.title,
      itemDescription: bp.subtitle,
      amount: bp.price / 100,
      blueprintId: bp.id,
    });
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="text-center space-y-3 pt-4 sm:pt-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Pricing
        </h1>
        <p className="text-sm text-white/60 max-w-lg mx-auto">
          Free prompts to get started. Agentic blueprints to transform how you deliver.
        </p>
      </header>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {tiers.map((tier) => {
          const accentColors = {
            green: {
              badge: "bg-green-500/20 border-green-500/30 text-green-300",
              border: tier.popular ? "border-nexus-violet/40" : "border-white/5",
              icon: "from-green-500/20 to-green-600/20",
            },
            cyan: {
              badge: "bg-nexus-cyan/20 border-nexus-cyan/30 text-nexus-cyan",
              border: "border-white/5",
              icon: "from-nexus-cyan/20 to-nexus-cyan/30",
            },
            violet: {
              badge: "bg-nexus-violet/20 border-nexus-violet/30 text-nexus-violet",
              border: "border-nexus-violet/30",
              icon: "from-nexus-violet/20 to-nexus-violet/30",
            },
          };
          const colors = accentColors[tier.accent as keyof typeof accentColors];

          return (
            <div
              key={tier.id}
              className={`glass-content p-5 sm:p-6 flex flex-col relative ${colors.border} ${
                tier.popular ? "ring-1 ring-nexus-violet/20" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-0.5 rounded-full bg-nexus-violet/30 border border-nexus-violet/50 text-nexus-violet text-xs font-semibold uppercase tracking-wider">
                    Best Value
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.icon} border border-white/10 flex items-center justify-center mb-4`}>
                <tier.icon className="w-5 h-5 text-white/70" />
              </div>

              {/* Name & Price */}
              <h2 className="text-base font-semibold text-white">{tier.name}</h2>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-3xl font-bold text-white">{tier.price}</span>
                <span className="text-xs text-white/60">{tier.period}</span>
              </div>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">{tier.description}</p>

              {/* Features */}
              <ul className="mt-5 space-y-2 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {feature.startsWith("  —") ? (
                      <span className="text-xs text-white/60 pl-5">{feature.trim()}</span>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-white/60">{feature}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {tier.id === "suite" ? (
                <button
                  onClick={handleBuySuite}
                  className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white hover:opacity-90 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {tier.cta}
                </button>
              ) : (
                <Link
                  href={tier.href}
                  className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    tier.popular
                      ? "bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white hover:opacity-90"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Individual blueprint purchase section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white text-center">Buy a Single Blueprint</h2>
        <p className="text-xs text-white/60 text-center max-w-md mx-auto">
          Choose one blueprint to purchase individually. Select a blueprint below and click Buy.
        </p>
        <div className="max-w-md mx-auto space-y-3">
          <div className="glass-content p-4 space-y-3">
            <select
              value={selectedBlueprint}
              onChange={(e) => setSelectedBlueprint(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-cyan/40 appearance-none"
            >
              <option value="" className="bg-nexus-dark text-white/50">Select a blueprint...</option>
              {allBlueprints.map((bp) => (
                <option key={bp.id} value={bp.id} className="bg-nexus-dark text-white">
                  {bp.title} — ${(bp.price / 100).toFixed(0)}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleBuySingle(selectedBlueprint)}
              disabled={!selectedBlueprint}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Blueprint
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise teaser */}
      <div className="glass-content p-5 sm:p-6 text-center space-y-3 border-white/5">
        <Crown className="w-8 h-8 text-yellow-400 mx-auto" />
        <h2 className="text-base font-semibold text-white">Enterprise</h2>
        <p className="text-xs text-white/60 max-w-md mx-auto">
          Need all 16 blueprints across SAFe, PRINCE2, PMBOK, and COBIT? Team licensing for 25+ seats?
          Enterprise pricing starts at $4,997/year.
        </p>
        <a
          href="mailto:enterprise@elitepmprompts.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          Contact for Enterprise Pricing
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* FAQ */}
      <section className="space-y-4 pb-4">
        <h2 className="text-lg font-semibold text-white text-center">Common Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {[
            {
              q: "What AI platform do I need?",
              a: "Blueprints work with Claude, ChatGPT, Gemini, or any LLM. They're delivered as structured prompts you copy-paste into your preferred tool.",
            },
            {
              q: "Is this a subscription?",
              a: "No. Single blueprints and methodology suites are one-time purchases with lifetime access. Only the Enterprise tier is annual.",
            },
            {
              q: "Can I try before I buy?",
              a: "Yes. The free prompt library gives you 50+ prompts to experience the methodology depth. Blueprints take this to the next level with multi-step workflows.",
            },
            {
              q: "What methodology knowledge do I need?",
              a: "The blueprints encode the methodology — you don't need deep SAFe certification to use them. But familiarity with the basics (PI Planning, sprints, backlogs) helps.",
            },
            {
              q: "How does payment work?",
              a: "We use PayFast, a secure South African payment gateway. You'll be redirected to PayFast to complete your payment via card, EFT, or other supported methods. After payment, you're redirected back with instant access.",
            },
            {
              q: "What if I want a refund?",
              a: "We offer a 14-day money-back guarantee. If the blueprints don't deliver value, email us and we'll process a full refund.",
            },
          ].map((faq) => (
            <div key={faq.q} className="glass-content p-4 space-y-1.5">
              <h3 className="text-xs font-semibold text-white">{faq.q}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
