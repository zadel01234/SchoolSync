"use client";

import { cn } from "@/lib/utils";

interface AttendanceRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function AttendanceRing({
  percentage,
  size = 80,
  strokeWidth = 6,
  label,
  className,
}: AttendanceRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (pct: number) => {
    if (pct >= 90) return "hsl(var(--success))";
    if (pct >= 75) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="hsl(var(--muted))"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke={getColor(percentage)}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{percentage}%</span>
        </div>
      </div>
      {label && (
        <span className="text-xs text-[hsl(var(--muted-foreground))]">{label}</span>
      )}
    </div>
  );
}
