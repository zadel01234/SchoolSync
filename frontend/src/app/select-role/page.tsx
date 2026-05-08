"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, School, Users, BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const roles: { role: UserRole; label: string; description: string; emoji: string; icon: React.ReactNode; color: string }[] = [
  { role: "school_admin", label: "School Owner / Admin", description: "Manage your school operations", emoji: "🏫", icon: <School className="h-7 w-7" />, color: "from-indigo-500/10 to-violet-500/10 border-indigo-200 dark:border-indigo-800" },
  { role: "teacher", label: "Teacher", description: "Attendance, assignments, results", emoji: "👩‍🏫", icon: <BookOpen className="h-7 w-7" />, color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-800" },
  { role: "parent", label: "Parent", description: "Track your child's progress", emoji: "👨‍👩‍👧", icon: <Users className="h-7 w-7" />, color: "from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-800" },
  { role: "student", label: "Student", description: "View assignments and results", emoji: "🎓", icon: <GraduationCap className="h-7 w-7" />, color: "from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800" },
];

export default function SelectRolePage() {
  const router = useRouter();
  const { setActiveRole } = useAuthStore();

  const handleSelect = (role: UserRole) => {
    setActiveRole(role);
    if (role === "super_admin" || role === "school_admin") {
      router.push("/dashboard/admin");
    } else {
      router.push(`/dashboard/${role}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[hsl(var(--background))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg space-y-8"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
            Welcome to SchoolSync
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Choose how you want to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((r, index) => (
            <motion.button
              key={r.role}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              onClick={() => handleSelect(r.role)}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-2xl border-2 bg-gradient-to-br p-6 text-center transition-all duration-200",
                "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
                r.color
              )}
            >
              <div className="text-4xl">{r.emoji}</div>
              <div>
                <p className="font-heading font-semibold text-[hsl(var(--foreground))]">
                  {r.label}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                  {r.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
