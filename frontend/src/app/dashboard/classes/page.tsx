"use client";

import { motion } from "framer-motion";
import { Users, Clock, BookOpen, ChevronRight, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/lib/animations";

const classes = [
  { id: "1", name: "JSS 2A", subject: "Mathematics", students: 42, schedule: "Mon, Wed, Fri", room: "Room 3A", color: "bg-indigo-500" },
  { id: "2", name: "JSS 2B", subject: "Mathematics", students: 40, schedule: "Tue, Thu", room: "Room 3B", color: "bg-indigo-500" },
  { id: "3", name: "JSS 3A", subject: "Mathematics", students: 45, schedule: "Mon, Wed, Thu", room: "Room 5A", color: "bg-indigo-500" },
  { id: "4", name: "SSS 1A", subject: "Further Math", students: 28, schedule: "Tue, Fri", room: "Lab 2", color: "bg-emerald-500" },
];

export default function ClassesPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">My Classes</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage your assigned classes and students</p>
        </div>
        <div className="flex-1 sm:max-w-xs">
          <Input placeholder="Search classes..." leftIcon={<Search className="h-4 w-4" />} />
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <Card key={cls.id} padding="md" hover className="group">
            <CardHeader className="pb-3 border-b border-[hsl(var(--border))] mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{cls.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${cls.color}`} />
                    <span className="text-sm font-medium">{cls.subject}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  {cls.students} students
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{cls.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{cls.room}</span>
                </div>
              </div>
              <div className="pt-2 flex gap-2">
                <Button size="sm" className="w-full">View Students</Button>
                <Button size="sm" variant="outline" className="px-3">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
