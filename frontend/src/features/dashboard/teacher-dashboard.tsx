"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, FileText, Bell, Users, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { getGreeting } from "@/lib/utils";

const todaysClasses = [
  { id: "1", subject: "Mathematics", className: "JSS 2A", time: "8:00 – 8:45", room: "Room 3A", studentsPresent: 38, totalStudents: 42 },
  { id: "2", subject: "Mathematics", className: "JSS 2B", time: "9:00 – 9:45", room: "Room 3B", studentsPresent: 0, totalStudents: 40 },
  { id: "3", subject: "Mathematics", className: "JSS 3A", time: "10:00 – 10:45", room: "Room 5A", studentsPresent: 0, totalStudents: 45 },
];

export function TeacherDashboard() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">{getGreeting()}, Mr. Adeyemi 👋</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">You have 3 classes scheduled today</p>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Today's Classes" value="3" icon={<Clock className="h-5 w-5" />} variant="primary" />
        <StatCard title="Pending Assignments" value="5" icon={<FileText className="h-5 w-5" />} variant="warning" />
        <StatCard title="Unread Notifications" value="8" icon={<Bell className="h-5 w-5" />} variant="danger" />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="md">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Today&apos;s Classes</CardTitle>
            <Button variant="outline" size="sm" leftIcon={<ClipboardCheck className="h-4 w-4" />}>Mark Attendance</Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {todaysClasses.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-lg border border-[hsl(var(--border))] p-4 hover:bg-[hsl(var(--muted))]/50 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{c.subject} — {c.className}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{c.time} • {c.room}</p>
                </div>
                {c.studentsPresent > 0 ? (
                  <Badge variant="success">{c.studentsPresent}/{c.totalStudents} present</Badge>
                ) : (
                  <Button size="sm" variant="outline">Take Attendance</Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
