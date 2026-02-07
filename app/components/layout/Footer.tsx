import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="glass-chrome mt-6" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nexus-cyan to-nexus-violet flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-bold">
                <span className="text-white">Elite</span>
                <span className="text-nexus-cyan">PM</span>
                <span className="text-white">Prompts</span>
              </span>
            </div>
            <p className="text-xs text-white/60 max-w-xs">
              Methodology-native AI workflow blueprints for enterprise project managers.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Product</h3>
            <div className="flex flex-col gap-1.5">
              <Link href="/blueprints" className="text-xs text-white/60 hover:text-nexus-cyan transition-colors">
                SAFe Blueprints
              </Link>
              <Link href="/prompts" className="text-xs text-white/60 hover:text-nexus-cyan transition-colors">
                Free Prompt Library
              </Link>
              <Link href="/pricing" className="text-xs text-white/60 hover:text-nexus-cyan transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          {/* Methodologies */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Methodologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {["SAFe 6.0", "PRINCE2", "PMBOK", "COBIT", "ITIL", "Scrum", "Kanban"].map((m) => (
                <span
                  key={m}
                  className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} ElitePMPrompts.com &mdash; The Project Manager&apos;s Nexus
          </p>
          <p className="text-xs text-white/50">
            Built for PMs who ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
