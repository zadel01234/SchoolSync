"use client";

import { motion } from "framer-motion";
import { Receipt, ClipboardCheck, BookOpen, Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { AttendanceRing } from "@/components/dashboard/attendance-ring";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { getGreeting, formatCurrency } from "@/lib/utils";

const children = [
  { id: "1", name: "David Okon", className: "JSS 2B", attendance: 92, feeBalance: 25000, avatar: undefined },
  { id: "2", name: "Sarah Okon", className: "Primary 5A", attendance: 97, feeBalance: 0, avatar: undefined },
];

export function ParentDashboard() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">{getGreeting()}, Mrs. Okon 👋</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Here&apos;s how your children are doing</p>
      </motion.div>

      {/* Children cards */}
      <motion.div variants={staggerItem} className="space-y-4">
        {children.map((child) => (
          <Card key={child.id} padding="md" hover>
            <div className="flex items-center gap-4">
              <UserAvatar name={child.name} size="lg" />
              <div className="flex-1">
                <p className="font-semibold">{child.name}</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{child.className}</p>
              </div>
              <AttendanceRing percentage={child.attendance} size={56} strokeWidth={4} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-[hsl(var(--muted))]/50 p-3 text-center">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Fee Balance</p>
                <p className={`text-sm font-bold ${child.feeBalance > 0 ? "text-[hsl(var(--destructive))]" : "text-[hsl(var(--success))]"}`}>
                  {child.feeBalance > 0 ? formatCurrency(child.feeBalance) : "Paid ✓"}
                </p>
              </div>
              <div className="rounded-lg bg-[hsl(var(--muted))]/50 p-3 text-center">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Attendance</p>
                <p className="text-sm font-bold">{child.attendance}%</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Fee Balance" value={formatCurrency(25000)} icon={<Receipt className="h-5 w-5" />} variant="danger" />
        <StatCard title="Avg Attendance" value="94.5%" icon={<ClipboardCheck className="h-5 w-5" />} variant="success" />
        <StatCard title="Announcements" value="3 new" icon={<Bell className="h-5 w-5" />} variant="primary" />
      </motion.div>
    </motion.div>
  );
}
