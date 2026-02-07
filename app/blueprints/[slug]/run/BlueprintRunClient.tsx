"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { getBlueprintBySlug } from "@/data/blueprints";
import { useBlueprintAccess } from "@/hooks/useBlueprintAccess";
import { BlueprintWizard } from "@/app/components/blueprints/BlueprintWizard";

interface Props {
  slug: string;
}

export default function BlueprintRunClient({ slug }: Props) {
  const blueprint = getBlueprintBySlug(slug);
  const { hasPurchased, isLoading } = useBlueprintAccess();

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

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-nexus-cyan/30 border-t-nexus-cyan rounded-full animate-spin" />
      </main>
    );
  }

  const purchased = hasPurchased(blueprint.id);

  if (!purchased) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-modal p-8 max-w-md w-full text-center space-y-4">
          <Lock className="w-10 h-10 text-white/30 mx-auto" />
          <h1 className="text-xl font-bold text-white">Access Required</h1>
          <p className="text-sm text-white/50">
            Purchase the {blueprint.title} blueprint to run the step-by-step wizard and produce
            your PM artifacts.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Purchase — ${(blueprint.price / 100).toFixed(0)}
            </Link>
            <Link
              href={`/blueprints/${blueprint.slug}`}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Blueprint Details
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto mb-6">
        <Link
          href={`/blueprints/${blueprint.slug}`}
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Blueprint Overview
        </Link>
      </div>

      <BlueprintWizard blueprint={blueprint} />
    </main>
  );
}
