"use client";

import { motion } from "framer-motion";
import { Users, Activity, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/avatar";
import { AttendanceRing } from "@/components/dashboard/attendance-ring";
import { staggerContainer, staggerItem } from "@/lib/animations";

const childrenData = [
  { 
    id: "1", name: "David Okon", class: "JSS 2B", admissionNo: "SS-001",
    attendance: 92, nextClass: "Mathematics", nextClassTime: "10:00 AM",
    pendingTasks: 3
  },
  { 
    id: "2", name: "Sarah Okon", class: "Primary 5A", admissionNo: "SS-002",
    attendance: 97, nextClass: "English", nextClassTime: "10:00 AM",
    pendingTasks: 0
  },
];

export default function ChildrenPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">My Children</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Detailed overview of your children's progress</p>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {childrenData.map((child) => (
          <Card key={child.id} padding="md" hover>
            <div className="flex items-center gap-4 border-b border-[hsl(var(--border))] pb-4 mb-4">
              <UserAvatar name={child.name} size="xl" />
              <div className="flex-1">
                <h2 className="text-xl font-bold font-heading">{child.name}</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{child.class} • #{child.admissionNo}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                <AttendanceRing percentage={child.attendance} size={64} strokeWidth={5} />
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 font-medium">Overall Attendance</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[hsl(var(--muted))]/50">
                <div className="h-16 w-16 rounded-full flex items-center justify-center bg-[hsl(var(--primary))]/10">
                  <span className="text-2xl font-bold text-[hsl(var(--primary))]">{child.pendingTasks}</span>
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 font-medium">Pending Tasks</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-sm font-semibold flex items-center gap-2"><Activity className="h-4 w-4" /> Current Activity</p>
              <div className="p-3 rounded-lg border border-[hsl(var(--border))] text-sm">
                <span className="text-[hsl(var(--muted-foreground))]">Next class:</span> <span className="font-medium">{child.nextClass} ({child.nextClassTime})</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" variant="outline" size="sm" leftIcon={<FileText className="h-4 w-4" />}>View Report Card</Button>
              <Button className="flex-1" size="sm">Full Profile</Button>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
