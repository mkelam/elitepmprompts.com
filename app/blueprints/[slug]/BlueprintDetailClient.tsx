"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Layers,
  FileCheck,
  CheckCircle2,
  Lock,
  Play,
  ShoppingCart,
  Download,
} from "lucide-react";
import { getBlueprintBySlug } from "@/data/blueprints";
import { useBlueprintAccess } from "@/hooks/useBlueprintAccess";
import { initiatePayFastPayment, checkPayFastReturn } from "@/lib/payfast";
import { downloadBlueprintPack } from "@/lib/blueprint-export";

interface Props {
  slug: string;
}

export default function BlueprintDetailClient({ slug }: Props) {
  const blueprint = getBlueprintBySlug(slug);
  const { hasPurchased, recordPurchase } = useBlueprintAccess();
  const [paymentRecorded, setPaymentRecorded] = useState(false);

  // Handle PayFast return redirect
  useEffect(() => {
    const result = checkPayFastReturn();
    if (result.success && result.blueprintId && !paymentRecorded) {
      recordPurchase({
        blueprintId: result.blueprintId,
        paymentRef: `payfast_${Date.now()}`,
        purchasedAt: new Date().toISOString(),
        email: "",
      });
      setPaymentRecorded(true);
      // Clean URL params
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("payment");
        url.searchParams.delete("blueprint");
        window.history.replaceState({}, "", url.pathname);
      }
    }
  }, [recordPurchase, paymentRecorded]);

  if (!blueprint) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white/50">Blueprint not found.</p>
          <Link href="/blueprints" className="text-nexus-cyan text-sm hover:underline">
            Back to Blueprints
          </Link>
        </div>
      </main>
    );
  }

  const purchased = hasPurchased(blueprint.id) || paymentRecorded;

  function handleBuy() {
    initiatePayFastPayment({
      itemName: blueprint!.title,
      itemDescription: blueprint!.subtitle,
      amount: blueprint!.price / 100,
      blueprintId: blueprint!.id,
    });
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/blueprints"
        className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        All Blueprints
      </Link>

      {/* Payment success banner */}
      {paymentRecorded && (
        <div className="glass-content p-4 border-green-500/30 bg-green-500/5">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">Payment successful! You now have access to this blueprint.</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20">
            {blueprint.methodology} {blueprint.version}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{blueprint.title}</h1>
        <p className="text-sm text-white/60">{blueprint.subtitle}</p>

        <div className="flex items-center gap-4 pt-1">
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <Layers className="w-3.5 h-3.5" />
            {blueprint.stepCount} steps
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <Clock className="w-3.5 h-3.5" />
            {blueprint.estimatedTime}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/60">
            <FileCheck className="w-3.5 h-3.5" />
            {blueprint.artifactsProduced.length} artifacts
          </span>
        </div>
      </header>

      {/* CTA */}
      <div className="glass-content p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {purchased ? (
          <>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">You have access to this blueprint</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/blueprints/${blueprint.slug}/run`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Play className="w-4 h-4" />
                Run Blueprint
              </Link>
              <button
                onClick={() => downloadBlueprintPack(blueprint)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Pack
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-lg font-bold text-white">${(blueprint.price / 100).toFixed(0)}</p>
              <p className="text-xs text-white/60">One-time purchase. Lifetime access.</p>
            </div>
            <button
              onClick={handleBuy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy This Blueprint
            </button>
          </>
        )}
      </div>

      {/* Required inputs */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-white">Required Inputs</h2>
        <p className="text-xs text-white/60">Gather this information before running the blueprint.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {blueprint.requiredInputs.map((input) => (
            <div key={input.name} className="glass-content p-3 space-y-1">
              <span className="text-xs font-medium text-white/80">{input.name}</span>
              <p className="text-xs text-white/60">{input.description}</p>
              <span className="text-xs text-white/50 font-mono">{input.format}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Steps overview */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-white">Steps</h2>
        <div className="space-y-2">
          {blueprint.steps.map((step) => (
            <div key={step.id} className="glass-content p-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-nexus-cyan/10 border border-nexus-cyan/20 flex items-center justify-center text-xs font-bold text-nexus-cyan flex-shrink-0">
                {step.id}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 font-medium truncate">{step.title}</p>
                <p className="text-xs text-white/60">{step.estimatedTime}</p>
              </div>
              {!purchased && (
                <Lock className="w-3.5 h-3.5 text-white/50 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Artifacts produced */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-white">Artifacts Produced</h2>
        <div className="flex flex-wrap gap-2">
          {blueprint.artifactsProduced.map((artifact) => (
            <span
              key={artifact}
              className="px-2.5 py-1 rounded-lg bg-nexus-violet/10 border border-nexus-violet/20 text-xs text-nexus-violet/80"
            >
              {artifact}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      {!purchased && (
        <div className="glass-content p-5 text-center space-y-3">
          <p className="text-sm text-white/60">
            Ready to produce your {blueprint.title} artifacts in {blueprint.estimatedTime}?
          </p>
          <button
            onClick={handleBuy}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            Get Started — ${(blueprint.price / 100).toFixed(0)}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </main>
  );
}
