"use client";

import React, { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CopyPromptButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyPromptButton({ text, label = "Copy Prompt", className = "" }: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
        copied
          ? "bg-green-500/20 border border-green-500/40 text-green-300"
          : "bg-gradient-to-r from-nexus-cyan/20 to-nexus-violet/20 border border-nexus-cyan/30 text-nexus-cyan hover:from-nexus-cyan/30 hover:to-nexus-violet/30"
      } ${className}`}
      aria-label={copied ? "Copied to clipboard" : label}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
}
