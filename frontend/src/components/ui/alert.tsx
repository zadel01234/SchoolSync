"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const variantStyles = {
  default: "border-[hsl(var(--border))] bg-[hsl(var(--card))]",
  success: "border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/5 text-[hsl(var(--success))]",
  warning: "border-[hsl(var(--warning))]/20 bg-[hsl(var(--warning))]/5 text-[hsl(var(--warning))]",
  destructive: "border-[hsl(var(--destructive))]/20 bg-[hsl(var(--destructive))]/5 text-[hsl(var(--destructive))]",
  info: "border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))]",
};

const variantIcons = {
  default: <Info className="h-4 w-4" />,
  success: <CheckCircle2 className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  destructive: <AlertCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

function Alert({
  className,
  variant = "default",
  title,
  dismissible = false,
  onDismiss,
  icon,
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(
        "relative flex gap-3 rounded-lg border p-4 text-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="mt-0.5 shrink-0">{icon || variantIcons[variant]}</div>
      <div className="flex-1 space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn(variant === "default" && "text-[hsl(var(--muted-foreground))]")}>
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="absolute right-3 top-3 rounded-md p-1 opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export { Alert };
