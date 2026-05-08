"use client";

import { motion } from "framer-motion";
import { Calendar, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timetableData: Record<string, { subject: string; time: string; teacher: string; room: string; color: string }[]> = {
  Monday: [
    { subject: "Mathematics", time: "8:00 – 8:45", teacher: "Mr. Adeyemi", room: "3A", color: "bg-indigo-500" },
    { subject: "English", time: "8:45 – 9:30", teacher: "Mrs. Obi", room: "3A", color: "bg-emerald-500" },
    { subject: "Break", time: "9:30 – 10:00", teacher: "", room: "", color: "bg-slate-300" },
    { subject: "Basic Science", time: "10:00 – 10:45", teacher: "Mr. Nnamdi", room: "Lab 1", color: "bg-amber-500" },
    { subject: "Social Studies", time: "10:45 – 11:30", teacher: "Ms. Bello", room: "3A", color: "bg-violet-500" },
    { subject: "P.H.E", time: "11:30 – 12:15", teacher: "Coach Emeka", room: "Field", color: "bg-rose-500" },
  ],
  Tuesday: [
    { subject: "English", time: "8:00 – 8:45", teacher: "Mrs. Obi", room: "3A", color: "bg-emerald-500" },
    { subject: "Mathematics", time: "8:45 – 9:30", teacher: "Mr. Adeyemi", room: "3A", color: "bg-indigo-500" },
    { subject: "Break", time: "9:30 – 10:00", teacher: "", room: "", color: "bg-slate-300" },
    { subject: "Civic Education", time: "10:00 – 10:45", teacher: "Ms. Bello", room: "3A", color: "bg-teal-500" },
    { subject: "Computer Science", time: "10:45 – 11:30", teacher: "Mr. Okoro", room: "ICT Lab", color: "bg-blue-500" },
    { subject: "French", time: "11:30 – 12:15", teacher: "Mme. Ada", room: "3B", color: "bg-pink-500" },
  ],
  Wednesday: [
    { subject: "Basic Science", time: "8:00 – 8:45", teacher: "Mr. Nnamdi", room: "Lab 1", color: "bg-amber-500" },
    { subject: "Mathematics", time: "8:45 – 9:30", teacher: "Mr. Adeyemi", room: "3A", color: "bg-indigo-500" },
    { subject: "Break", time: "9:30 – 10:00", teacher: "", room: "", color: "bg-slate-300" },
    { subject: "Agriculture", time: "10:00 – 10:45", teacher: "Mr. Uche", room: "3A", color: "bg-lime-500" },
    { subject: "Fine Arts", time: "10:45 – 11:30", teacher: "Mrs. Kanu", room: "Art Room", color: "bg-orange-500" },
  ],
  Thursday: [
    { subject: "English", time: "8:00 – 8:45", teacher: "Mrs. Obi", room: "3A", color: "bg-emerald-500" },
    { subject: "Social Studies", time: "8:45 – 9:30", teacher: "Ms. Bello", room: "3A", color: "bg-violet-500" },
    { subject: "Break", time: "9:30 – 10:00", teacher: "", room: "", color: "bg-slate-300" },
    { subject: "Basic Technology", time: "10:00 – 10:45", teacher: "Mr. Eze", room: "Workshop", color: "bg-cyan-500" },
    { subject: "Mathematics", time: "10:45 – 11:30", teacher: "Mr. Adeyemi", room: "3A", color: "bg-indigo-500" },
    { subject: "Music", time: "11:30 – 12:15", teacher: "Mr. Bayo", room: "Music Room", color: "bg-fuchsia-500" },
  ],
  Friday: [
    { subject: "Computer Science", time: "8:00 – 8:45", teacher: "Mr. Okoro", room: "ICT Lab", color: "bg-blue-500" },
    { subject: "French", time: "8:45 – 9:30", teacher: "Mme. Ada", room: "3B", color: "bg-pink-500" },
    { subject: "Break", time: "9:30 – 10:00", teacher: "", room: "", color: "bg-slate-300" },
    { subject: "Civic Education", time: "10:00 – 10:45", teacher: "Ms. Bello", room: "3A", color: "bg-teal-500" },
    { subject: "P.H.E", time: "10:45 – 11:30", teacher: "Coach Emeka", room: "Field", color: "bg-rose-500" },
  ],
};

export default function TimetablePage() {
  const today = days[new Date().getDay() - 1] || "Monday";

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">Timetable</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">JSS 2B — Weekly class schedule</p>
      </motion.div>

      {/* Desktop: Full week grid */}
      <motion.div variants={staggerItem} className="hidden lg:block overflow-x-auto">
        <div className="grid grid-cols-5 gap-3 min-w-[900px]">
          {days.map((day) => (
            <div key={day} className="space-y-2">
              <h3 className={`text-sm font-semibold px-1 ${day === today ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                {day} {day === today && <Badge variant="default" className="ml-1 text-[10px]">Today</Badge>}
              </h3>
              {(timetableData[day] || []).map((entry, i) => (
                <div
                  key={i}
                  className={`rounded-lg border border-[hsl(var(--border))] p-3 text-sm ${
                    entry.subject === "Break"
                      ? "bg-[hsl(var(--muted))]/50 text-center text-[hsl(var(--muted-foreground))] italic"
                      : "bg-[hsl(var(--card))] hover:shadow-card-hover transition-shadow"
                  }`}
                >
                  {entry.subject !== "Break" ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-2 w-2 rounded-full ${entry.color}`} />
                        <span className="font-medium">{entry.subject}</span>
                      </div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{entry.time}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{entry.teacher} • {entry.room}</p>
                    </>
                  ) : (
                    <span className="text-xs">Break · {entry.time}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mobile: Day-by-day cards */}
      <motion.div variants={staggerItem} className="lg:hidden space-y-4">
        {days.map((day) => (
          <Card key={day} padding="md" className={day === today ? "border-[hsl(var(--primary))]/30" : ""}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {day}
                {day === today && <Badge variant="default" className="text-[10px]">Today</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(timetableData[day] || []).map((entry, i) => (
                <div key={i} className={`flex items-center gap-3 rounded-lg p-2.5 ${entry.subject === "Break" ? "bg-[hsl(var(--muted))]/50" : ""}`}>
                  {entry.subject !== "Break" ? (
                    <>
                      <div className={`h-9 w-1 rounded-full ${entry.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{entry.subject}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{entry.teacher} • {entry.room}</p>
                      </div>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{entry.time}</span>
                    </>
                  ) : (
                    <span className="text-xs text-[hsl(var(--muted-foreground))] italic w-full text-center">Break · {entry.time}</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
