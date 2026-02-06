import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
  variant?: "content" | "modal" | "chrome";
}

export function GlassCard({ className, children, active, variant = "content", ...props }: GlassCardProps) {
  const variants = {
    content: "glass-content",
    modal: "glass-modal",
    chrome: "glass-chrome",
  };

  return (
    <div
      className={cn(
        variants[variant],
        active && "ring-1 ring-white/30 border-white/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
