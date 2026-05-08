"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Clock, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { Alert } from "@/components/ui/alert";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { AttendanceStatus } from "@/types";

const students = [
  { id: "1", name: "David Okon", admissionNumber: "SS-001" },
  { id: "2", name: "Sarah Adeleke", admissionNumber: "SS-002" },
  { id: "3", name: "Michael Ibrahim", admissionNumber: "SS-003" },
  { id: "4", name: "Faith Nwosu", admissionNumber: "SS-004" },
  { id: "5", name: "Emmanuel Bassey", admissionNumber: "SS-005" },
  { id: "6", name: "Grace Ojo", admissionNumber: "SS-006" },
  { id: "7", name: "Peter Musa", admissionNumber: "SS-007" },
  { id: "8", name: "Joy Aliyu", admissionNumber: "SS-008" },
];

const statusColors: Record<AttendanceStatus, string> = {
  present: "bg-[hsl(var(--success))] text-white",
  absent: "bg-[hsl(var(--destructive))] text-white",
  late: "bg-[hsl(var(--warning))] text-white",
  excused: "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]",
};

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [saved, setSaved] = useState(false);

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
    setSaved(false);
  };

  const markAll = (status: AttendanceStatus) => {
    const all: Record<string, AttendanceStatus> = {};
    students.forEach((s) => { all[s.id] = status; });
    setAttendance(all);
    setSaved(false);
  };

  const markedCount = Object.keys(attendance).length;
  const presentCount = Object.values(attendance).filter((s) => s === "present").length;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Mark Attendance</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">JSS 2B — {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => markAll("present")}>Mark All Present</Button>
          <Button size="sm" leftIcon={<Save className="h-4 w-4" />} onClick={() => setSaved(true)} disabled={markedCount < students.length}>
            Save ({markedCount}/{students.length})
          </Button>
        </div>
      </motion.div>

      {saved && (
        <Alert variant="success" title="Attendance saved!" dismissible>
          Attendance for JSS 2B has been recorded. {presentCount}/{students.length} students present.
        </Alert>
      )}

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="divide-y divide-[hsl(var(--border))]">
            {students.map((student) => {
              const status = attendance[student.id];
              return (
                <div key={student.id} className="flex items-center gap-4 px-4 py-3 md:px-6">
                  <UserAvatar name={student.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">#{student.admissionNumber}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {(["present", "late", "absent"] as AttendanceStatus[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(student.id, s)}
                        className={cn(
                          "flex h-9 w-9 md:h-8 md:w-auto md:px-3 items-center justify-center rounded-lg text-xs font-medium transition-all",
                          status === s ? statusColors[s] : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80"
                        )}
                        aria-label={s}
                      >
                        {s === "present" && <Check className="h-4 w-4" />}
                        {s === "late" && <Clock className="h-4 w-4" />}
                        {s === "absent" && <X className="h-4 w-4" />}
                        <span className="hidden md:inline ml-1 capitalize">{s}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
