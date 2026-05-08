"use client";

import { motion } from "framer-motion";
import { FileText, Plus, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/lib/animations";

const assignments = [
  { id: "1", title: "Algebra: Quadratic Equations", subject: "Mathematics", class: "JSS 2B", dueDate: "Tomorrow, 11:59 PM", status: "pending", submitted: 32, total: 42 },
  { id: "2", title: "Essay: Environmental Awareness", subject: "English", class: "JSS 3A", dueDate: "May 10, 2025", status: "submitted", submitted: 45, total: 45 },
  { id: "3", title: "Lab Report: Photosynthesis", subject: "Basic Science", class: "SSS 1A", dueDate: "May 8, 2025", status: "overdue", submitted: 25, total: 28 },
];

const statusStyles = {
  pending: { icon: <Clock className="h-4 w-4 text-[hsl(var(--warning))]" />, badge: "warning" },
  submitted: { icon: <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />, badge: "success" },
  overdue: { icon: <AlertCircle className="h-4 w-4 text-[hsl(var(--destructive))]" />, badge: "destructive" },
} as const;

export default function AssignmentsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Assignments</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Track coursework and homework submissions</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>Create Assignment</Button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 sm:max-w-md">
          <Input placeholder="Search assignments..." leftIcon={<Search className="h-4 w-4" />} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Active</Button>
          <Button variant="ghost">Graded</Button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 gap-4">
        {assignments.map((assignment) => {
          const style = statusStyles[assignment.status as keyof typeof statusStyles];
          return (
            <Card key={assignment.id} padding="md" hover>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg truncate">{assignment.title}</CardTitle>
                    <Badge variant={style.badge as any}>{assignment.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="font-medium text-[hsl(var(--foreground))]">{assignment.subject}</span>
                    <span>•</span>
                    <span>{assignment.class}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">{style.icon} Due {assignment.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[hsl(var(--border))] pt-4 md:pt-0 md:pl-6">
                  <div className="text-center">
                    <p className="text-xl font-bold">{assignment.submitted}/{assignment.total}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Submitted</p>
                  </div>
                  <Button variant="secondary" size="sm">Grade</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
