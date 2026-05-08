"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, FileText, Plus, GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/lib/animations";

const subjects = [
  { id: "1", name: "Mathematics", teacher: "Mr. Adeyemi", classes: ["JSS 2A", "JSS 2B", "JSS 3A"], color: "bg-indigo-500" },
  { id: "2", name: "English Language", teacher: "Mrs. Obi", classes: ["JSS 2A", "JSS 2B"], color: "bg-emerald-500" },
  { id: "3", name: "Basic Science", teacher: "Mr. Nnamdi", classes: ["JSS 2A", "JSS 2B", "JSS 3A", "JSS 3B"], color: "bg-amber-500" },
  { id: "4", name: "Social Studies", teacher: "Ms. Bello", classes: ["JSS 2A", "JSS 2B"], color: "bg-violet-500" },
  { id: "5", name: "Computer Science", teacher: "Mr. Okoro", classes: ["JSS 2A", "JSS 2B", "SSS 1A"], color: "bg-blue-500" },
  { id: "6", name: "French", teacher: "Mme. Ada", classes: ["JSS 2A", "JSS 2B"], color: "bg-pink-500" },
];

const recentAssignments = [
  { id: "1", title: "Quadratic Equations Practice", subject: "Mathematics", dueDate: "May 10, 2025", submissions: 32, total: 42, status: "active" },
  { id: "2", title: "Essay: Environmental Awareness", subject: "English", dueDate: "May 8, 2025", submissions: 40, total: 42, status: "closed" },
  { id: "3", title: "Lab Report: Photosynthesis", subject: "Basic Science", dueDate: "May 12, 2025", submissions: 15, total: 42, status: "active" },
];

export default function AcademicsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Academics</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage subjects, assignments, and results</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" leftIcon={<Calendar className="h-4 w-4" />}>Timetable</Button>
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>New Assignment</Button>
        </div>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div variants={staggerItem}>
        <h2 className="text-lg font-heading font-semibold mb-3">Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Card key={subject.id} padding="md" hover>
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${subject.color}/10`}>
                  <BookOpen className={`h-5 w-5 ${subject.color.replace("bg-", "text-")}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{subject.name}</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{subject.teacher}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {subject.classes.map((c) => (
                      <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent Assignments */}
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4" />Recent Assignments
            </CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {recentAssignments.map((a) => (
              <div key={a.id} className="flex items-center gap-4 rounded-lg border border-[hsl(var(--border))] p-4 hover:bg-[hsl(var(--muted))]/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{a.subject} • Due {a.dueDate}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{a.submissions}/{a.total}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">submissions</p>
                </div>
                <Badge variant={a.status === "active" ? "success" : "secondary"}>{a.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
