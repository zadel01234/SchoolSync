"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
}

const variantStyles = {
  default: "bg-[hsl(var(--card))]",
  primary: "bg-[hsl(var(--primary))]/5",
  success: "bg-[hsl(var(--success))]/5",
  warning: "bg-[hsl(var(--warning))]/5",
  danger: "bg-[hsl(var(--destructive))]/5",
};

const iconBgStyles = {
  default: "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]",
  primary: "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]",
  success: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  warning: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  danger: "bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))]",
};

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[hsl(var(--border))] p-5 shadow-card transition-shadow hover:shadow-card-hover",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{title}</p>
          <p className="text-2xl font-bold font-heading tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 text-xs">
              {change > 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-[hsl(var(--success))]" />
              ) : change < 0 ? (
                <TrendingDown className="h-3.5 w-3.5 text-[hsl(var(--destructive))]" />
              ) : (
                <Minus className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
              )}
              <span
                className={cn(
                  "font-medium",
                  change > 0 && "text-[hsl(var(--success))]",
                  change < 0 && "text-[hsl(var(--destructive))]",
                  change === 0 && "text-[hsl(var(--muted-foreground))]"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-[hsl(var(--muted-foreground))]">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn("rounded-lg p-2.5", iconBgStyles[variant])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
