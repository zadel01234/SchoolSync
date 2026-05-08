"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        secondary:
          "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
        destructive:
          "border-transparent bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]",
        success:
          "border-transparent bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
        warning:
          "border-transparent bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
        outline:
          "border-[hsl(var(--border))] text-[hsl(var(--foreground))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", {
            "bg-[hsl(var(--primary-foreground))]": variant === "default",
            "bg-[hsl(var(--destructive))]": variant === "destructive",
            "bg-[hsl(var(--success))]": variant === "success",
            "bg-[hsl(var(--warning))]": variant === "warning",
            "bg-[hsl(var(--foreground))]": variant === "outline" || variant === "secondary",
          })}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
