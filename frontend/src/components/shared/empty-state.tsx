"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="rounded-full bg-[hsl(var(--muted))] p-4 mb-4">
        {icon || <FileQuestion className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />}
      </div>
      <h3 className="text-lg font-semibold font-heading mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mb-4">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}
