"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Layers, FileCheck, CheckCircle2, ShoppingCart } from "lucide-react";
import { allBlueprints, safeSuite } from "@/data/blueprints";
import { BlueprintCard } from "@/app/components/blueprints/BlueprintCard";
import { useBlueprintAccess } from "@/hooks/useBlueprintAccess";
import { checkPayFastReturn, initiatePayFastPayment } from "@/lib/payfast";

export default function BlueprintsPage() {
  const { hasPurchased, recordPurchase } = useBlueprintAccess();
  const [paymentRecorded, setPaymentRecorded] = useState(false);

  // Handle PayFast return redirect (suite purchases land here)
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

  function handleBuySuite() {
    initiatePayFastPayment({
      itemName: safeSuite.name,
      itemDescription: "All 4 SAFe 6.0 blueprints — complete methodology coverage",
      amount: safeSuite.price / 100,
      blueprintId: safeSuite.id,
      returnPath: "/blueprints",
    });
  }

  // Aggregate stats
  const totalSteps = allBlueprints.reduce((sum, b) => sum + b.stepCount, 0);
  const totalArtifacts = allBlueprints.reduce((sum, b) => sum + b.artifactsProduced.length, 0);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-6xl mx-auto space-y-8">
      {/* Payment success banner */}
      {paymentRecorded && (
        <div className="glass-content p-4 border-green-500/30 bg-green-500/5">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">Payment successful! You now have access to all SAFe blueprints.</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-cyan/10 border border-nexus-cyan/30">
          <BookOpen className="w-3.5 h-3.5 text-nexus-cyan" />
          <span className="text-xs text-nexus-cyan font-medium">SAFe 6.0 Methodology Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Agentic Blueprints
        </h1>
        <p className="text-sm text-white/60 max-w-lg mx-auto">
          Multi-step AI workflows that produce complete, methodology-compliant PM artifacts.
          Each blueprint guides you through a structured ceremony with checkpoints at every step.
        </p>

        {/* Suite stats */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <BookOpen className="w-3.5 h-3.5" />
            {allBlueprints.length} blueprints
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <Layers className="w-3.5 h-3.5" />
            {totalSteps} total steps
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <FileCheck className="w-3.5 h-3.5" />
            {totalArtifacts} artifacts
          </div>
        </div>
      </header>

      {/* Suite offer banner */}
      <div className="glass-content p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-nexus-violet/20">
        <div>
          <h2 className="text-sm font-semibold text-white">{safeSuite.name}</h2>
          <p className="text-xs text-white/60 mt-1">{safeSuite.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-white/50 line-through">${(allBlueprints.length * 297)}</p>
            <p className="text-lg font-bold text-white">${(safeSuite.price / 100).toFixed(0)}</p>
          </div>
          {hasPurchased("safe-suite") ? (
            <span className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium whitespace-nowrap">
              Purchased
            </span>
          ) : (
            <button
              onClick={handleBuySuite}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Get the Suite
            </button>
          )}
        </div>
      </div>

      {/* Blueprint grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allBlueprints.map((blueprint) => (
          <BlueprintCard
            key={blueprint.id}
            blueprint={blueprint}
            isPurchased={hasPurchased(blueprint.id)}
          />
        ))}
      </div>
    </main>
  );
}
