"use client";

import { motion } from "framer-motion";
import { BarChart3, Search, Download, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";

const results = [
  { id: "1", student: "David Okon", class: "JSS 2B", math: 85, eng: 78, sci: 92, total: 255, avg: 85, grade: "A" },
  { id: "2", student: "Sarah Adeleke", class: "JSS 2B", math: 92, eng: 88, sci: 95, total: 275, avg: 91.6, grade: "A+" },
  { id: "3", student: "Michael Ibrahim", class: "JSS 2B", math: 65, eng: 70, sci: 68, total: 203, avg: 67.6, grade: "C" },
  { id: "4", student: "Faith Nwosu", class: "JSS 2B", math: 78, eng: 82, sci: 75, total: 235, avg: 78.3, grade: "B" },
  { id: "5", student: "Emmanuel Bassey", class: "JSS 2B", math: 45, eng: 55, sci: 50, total: 150, avg: 50, grade: "D" },
];

export default function ResultsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Academic Results</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">View and publish student grades</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export PDF</Button>
          <Button size="sm" leftIcon={<BarChart3 className="h-4 w-4" />}>Generate Reports</Button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 sm:max-w-md">
          <Input placeholder="Search students..." leftIcon={<Search className="h-4 w-4" />} />
        </div>
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>Class: JSS 2B</Button>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none" className="overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Student</th>
                <th className="px-4 py-3 text-center font-medium text-[hsl(var(--muted-foreground))]">Mathematics</th>
                <th className="px-4 py-3 text-center font-medium text-[hsl(var(--muted-foreground))]">English</th>
                <th className="px-4 py-3 text-center font-medium text-[hsl(var(--muted-foreground))]">Science</th>
                <th className="px-4 py-3 text-center font-medium text-[hsl(var(--muted-foreground))]">Total</th>
                <th className="px-4 py-3 text-center font-medium text-[hsl(var(--muted-foreground))]">Average</th>
                <th className="px-4 py-3 text-center font-medium text-[hsl(var(--muted-foreground))]">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-[hsl(var(--muted))]/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={r.student} size="sm" />
                      <div>
                        <span className="font-medium block">{r.student}</span>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">{r.class}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-medium">{r.math}</td>
                  <td className="px-4 py-3 text-center font-medium">{r.eng}</td>
                  <td className="px-4 py-3 text-center font-medium">{r.sci}</td>
                  <td className="px-4 py-3 text-center font-semibold text-[hsl(var(--primary))]">{r.total}</td>
                  <td className="px-4 py-3 text-center">{r.avg}%</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={r.grade === "A" || r.grade === "A+" ? "success" : r.grade === "D" || r.grade === "F" ? "destructive" : "secondary"}>
                      {r.grade}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
