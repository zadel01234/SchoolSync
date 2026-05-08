"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, CheckCircle, AlertCircle, Calendar, FileText, BarChart3, Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AttendanceRing } from "@/components/dashboard/attendance-ring";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { getGreeting } from "@/lib/utils";

const timetable = [
  { id: "1", subject: "Mathematics", time: "8:00 – 8:45", teacher: "Mr. Adeyemi", room: "Room 3A", color: "bg-indigo-500", active: true },
  { id: "2", subject: "English Language", time: "8:45 – 9:30", teacher: "Mrs. Obi", room: "Room 3A", color: "bg-emerald-500", active: false },
  { id: "3", subject: "Basic Science", time: "10:00 – 10:45", teacher: "Mr. Nnamdi", room: "Lab 1", color: "bg-amber-500", active: false },
  { id: "4", subject: "Social Studies", time: "10:45 – 11:30", teacher: "Ms. Bello", room: "Room 3A", color: "bg-violet-500", active: false },
];

const assignments = [
  { id: "1", title: "Algebra: Quadratic Equations", subject: "Mathematics", dueDate: "Tomorrow", status: "pending" as const },
  { id: "2", title: "Essay: My Best Holiday", subject: "English", dueDate: "May 10", status: "submitted" as const },
  { id: "3", title: "Lab Report: Photosynthesis", subject: "Basic Science", dueDate: "May 8", status: "overdue" as const },
];

const results = [
  { subject: "Mathematics", score: 82, grade: "A" },
  { subject: "English", score: 75, grade: "B" },
  { subject: "Science", score: 88, grade: "A" },
  { subject: "Social Studies", score: 70, grade: "B" },
];

const announcements = [
  { id: "1", title: "Mid-term exam timetable released", time: "2h ago", priority: "high" as const },
  { id: "2", title: "PTA meeting rescheduled to Friday", time: "5h ago", priority: "medium" as const },
  { id: "3", title: "Sports day registration open", time: "1d ago", priority: "low" as const },
];

const events = [
  { id: "1", title: "Mid-term Exams Begin", date: "May 12", type: "exam" },
  { id: "2", title: "PTA Meeting", date: "May 16", type: "event" },
  { id: "3", title: "Science Fair", date: "May 22", type: "event" },
];

const statusBadge = { pending: "warning", submitted: "success", overdue: "destructive" } as const;

export function StudentDashboard() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Welcome Header */}
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <UserAvatar name="David Okon" size="xl" />
        <div>
          <h1 className="text-xl md:text-2xl font-heading font-bold">{getGreeting()}, David 👋</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">JSS 2B • 2025/2026 First Term</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={staggerItem} className="grid grid-cols-3 gap-3">
        <Card padding="sm" className="text-center">
          <AttendanceRing percentage={92} size={56} strokeWidth={4} />
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Attendance</p>
        </Card>
        <Card padding="sm" className="text-center">
          <p className="text-2xl font-bold text-[hsl(var(--warning))]">3</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Pending Tasks</p>
        </Card>
        <Card padding="sm" className="text-center">
          <p className="text-2xl font-bold text-[hsl(var(--primary))]">B+</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Avg Grade</p>
        </Card>
      </motion.div>

      {/* Today's Timetable */}
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4" />Today&apos;s Timetable</CardTitle>
            <Button variant="ghost" size="sm">Full view</Button>
          </CardHeader>
          <CardContent className="space-y-2 pt-2">
            {timetable.map((entry) => (
              <div key={entry.id} className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${entry.active ? "bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20" : "hover:bg-[hsl(var(--muted))]/50"}`}>
                <div className={`h-10 w-1 rounded-full ${entry.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{entry.subject}</p>
                    {entry.active && <Badge variant="default" className="text-[10px] h-5">Now</Badge>}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{entry.teacher} • {entry.room}</p>
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">{entry.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Two-column grid for desktop */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Assignments */}
        <Card padding="md">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4" />Assignments</CardTitle>
            <Badge variant="warning">{assignments.filter(a => a.status === "pending").length} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {assignments.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--border))] p-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{a.title}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{a.subject} • Due {a.dueDate}</p>
                </div>
                <Badge variant={statusBadge[a.status]}>{a.status}</Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">View All Assignments</Button>
          </CardContent>
        </Card>

        {/* Latest Results */}
        <Card padding="md">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4" />Latest Results</CardTitle>
            <Button variant="ghost" size="sm">Report Card</Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {results.map((r) => (
              <div key={r.subject} className="flex items-center justify-between py-2 border-b border-[hsl(var(--border))] last:border-0">
                <span className="text-sm">{r.subject}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                    <div className="h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: `${r.score}%` }} />
                  </div>
                  <span className="text-sm font-semibold w-6">{r.score}</span>
                  <Badge variant="secondary" className="w-6 justify-center">{r.grade}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Announcements & Events */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card padding="md">
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4" />Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-2">
            {announcements.map((a) => (
              <div key={a.id} className="flex items-start gap-3 text-sm">
                <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${a.priority === "high" ? "bg-[hsl(var(--destructive))]" : a.priority === "medium" ? "bg-[hsl(var(--warning))]" : "bg-[hsl(var(--muted-foreground))]"}`} />
                <div className="flex-1"><p className="font-medium">{a.title}</p><p className="text-xs text-[hsl(var(--muted-foreground))]">{a.time}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card padding="md">
          <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4" />Upcoming Events</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-2">
            {events.map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-lg border border-[hsl(var(--border))] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  <Calendar className="h-4 w-4" />
                </div>
                <div><p className="font-medium text-sm">{e.title}</p><p className="text-xs text-[hsl(var(--muted-foreground))]">{e.date}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
