"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Download, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";

const mockStudents = [
  { id: "1", firstName: "David", lastName: "Okon", className: "JSS 2B", admissionNumber: "SS-2024-001", gender: "male", status: "active" },
  { id: "2", firstName: "Sarah", lastName: "Adeleke", className: "JSS 2A", admissionNumber: "SS-2024-002", gender: "female", status: "active" },
  { id: "3", firstName: "Michael", lastName: "Ibrahim", className: "SSS 1A", admissionNumber: "SS-2024-003", gender: "male", status: "active" },
  { id: "4", firstName: "Faith", lastName: "Nwosu", className: "JSS 3B", admissionNumber: "SS-2024-004", gender: "female", status: "inactive" },
  { id: "5", firstName: "Emmanuel", lastName: "Bassey", className: "SSS 2A", admissionNumber: "SS-2024-005", gender: "male", status: "active" },
  { id: "6", firstName: "Grace", lastName: "Ojo", className: "JSS 1A", admissionNumber: "SS-2024-006", gender: "female", status: "active" },
  { id: "7", firstName: "Peter", lastName: "Musa", className: "SSS 3A", admissionNumber: "SS-2024-007", gender: "male", status: "graduated" },
  { id: "8", firstName: "Joy", lastName: "Aliyu", className: "JSS 2B", admissionNumber: "SS-2024-008", gender: "female", status: "active" },
];

const statusVariant = { active: "success", inactive: "secondary", graduated: "warning", transferred: "destructive" } as const;

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockStudents.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.admissionNumber}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Students</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{mockStudents.length} students enrolled</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>Add Student</Button>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search className="h-4 w-4" />} />
        </div>
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>Filter</Button>
      </motion.div>

      {/* Desktop Table */}
      <motion.div variants={staggerItem} className="hidden md:block">
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">
                    <input type="checkbox" className="h-4 w-4 rounded border-[hsl(var(--border))]" />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Student</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Admission No.</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Class</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Gender</th>
                  <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                    <td className="px-4 py-3"><input type="checkbox" className="h-4 w-4 rounded border-[hsl(var(--border))]" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={`${s.firstName} ${s.lastName}`} size="sm" />
                        <span className="font-medium">{s.firstName} {s.lastName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{s.admissionNumber}</td>
                    <td className="px-4 py-3">{s.className}</td>
                    <td className="px-4 py-3 capitalize">{s.gender}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[s.status as keyof typeof statusVariant]} dot>{s.status}</Badge></td>
                    <td className="px-4 py-3 text-right"><Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-[hsl(var(--border))] px-4 py-3">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Showing {filtered.length} of {mockStudents.length}</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon-sm"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon-sm"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Mobile Card View */}
      <motion.div variants={staggerItem} className="md:hidden space-y-3">
        {filtered.map((s) => (
          <Card key={s.id} padding="md" hover>
            <div className="flex items-center gap-3">
              <UserAvatar name={`${s.firstName} ${s.lastName}`} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{s.firstName} {s.lastName}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{s.className} • #{s.admissionNumber}</p>
              </div>
              <Badge variant={statusVariant[s.status as keyof typeof statusVariant]}>{s.status}</Badge>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
