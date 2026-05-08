"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "success" | "warning" | "destructive";
  }
>(({ className, value, variant = "default", ...props }, ref) => {
  const colors: Record<string, string> = {
    default: "bg-[hsl(var(--primary))]",
    success: "bg-[hsl(var(--success))]",
    warning: "bg-[hsl(var(--warning))]",
    destructive: "bg-[hsl(var(--destructive))]",
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2.5 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))]", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full rounded-full transition-all duration-500 ease-out", colors[variant])}
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";

export { Progress };
