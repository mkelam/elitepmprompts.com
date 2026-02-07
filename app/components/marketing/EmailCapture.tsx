"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

interface EmailCaptureProps {
  onEmailSubmitted: (email: string) => void;
  variant?: "gate" | "inline";
}

const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL || "";

export function EmailCapture({ onEmailSubmitted, variant = "gate" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    // If Mailchimp URL is configured, submit to it in a hidden iframe
    if (MAILCHIMP_URL) {
      const iframe = document.createElement("iframe");
      iframe.name = "mc-hidden";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const form = document.createElement("form");
      form.action = MAILCHIMP_URL;
      form.method = "POST";
      form.target = "mc-hidden";

      const input = document.createElement("input");
      input.name = "EMAIL";
      input.value = email;
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 3000);
    }

    setSubmitted(true);
    onEmailSubmitted(email);
  }

  if (submitted) {
    return (
      <div className="glass-content p-6 text-center space-y-3 border-green-500/20 bg-green-500/5">
        <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
        <p className="text-sm font-medium text-green-300">You're in! Access unlocked.</p>
        <p className="text-xs text-white/60">Scroll down to browse all 50+ prompts.</p>
      </div>
    );
  }

  if (variant === "gate") {
    return (
      <div className="glass-content p-6 sm:p-8 max-w-lg mx-auto text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-nexus-cyan/10 border border-nexus-cyan/20 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6 text-nexus-cyan" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Get Free Access</h2>
          <p className="text-sm text-white/60">
            Enter your email to unlock 50+ methodology-aligned AI prompts across
            PMBOK, Agile, SAFe, PRINCE2, COBIT, and more.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-nexus-cyan/40"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nexus-cyan to-nexus-violet text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
          >
            Unlock Prompts
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-white/50">
          No spam. Unsubscribe anytime. We'll send occasional methodology tips.
        </p>
      </div>
    );
  }

  // Inline variant (smaller, for sidebars or footers)
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-nexus-cyan/40"
      />
      <button
        type="submit"
        className="px-3 py-2 rounded-lg bg-nexus-cyan/20 border border-nexus-cyan/30 text-nexus-cyan text-xs font-medium hover:bg-nexus-cyan/30 transition-colors cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}
