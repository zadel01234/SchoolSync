"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text";
  width?: string | number;
  height?: string | number;
}

function Skeleton({ className, variant = "default", width, height, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[hsl(var(--muted))]",
        variant === "default" && "rounded-lg",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded h-4 w-3/4",
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Pre-built skeleton patterns */
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[hsl(var(--border))] p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 px-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3 border-b border-[hsl(var(--border))]">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

function SkeletonStat() {
  return (
    <div className="rounded-xl border border-[hsl(var(--border))] p-5 space-y-3">
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTable, SkeletonStat };
