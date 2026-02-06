import { cn } from "@/lib/utils";
import React from "react";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function GlassInput({ className, ...props }: GlassInputProps) {
  return (
    <input
      className={cn(
        "glass-input-field w-full text-white placeholder:text-white/50 px-4 py-2 outline-none",
        className
      )}
      {...props}
    />
  );
}
