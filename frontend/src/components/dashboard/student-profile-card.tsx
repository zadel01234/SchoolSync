"use client";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Student } from "@/types";

interface StudentProfileCardProps {
  student: Student;
  onClick?: () => void;
  className?: string;
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  active: "success",
  inactive: "secondary",
  graduated: "warning",
  transferred: "destructive",
};

export function StudentProfileCard({ student, onClick, className }: StudentProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-card transition-all",
        onClick && "cursor-pointer hover:shadow-card-hover hover:border-[hsl(var(--primary))]/30",
        className
      )}
    >
      <UserAvatar name={`${student.firstName} ${student.lastName}`} src={student.avatar} size="lg" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">
          {student.firstName} {student.lastName}
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{student.className}</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">#{student.admissionNumber}</p>
      </div>
      <Badge variant={statusVariant[student.status]} dot>
        {student.status}
      </Badge>
    </div>
  );
}
