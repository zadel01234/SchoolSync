"use client";

import { motion } from "framer-motion";
import { Building2, Plus, Search, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/lib/animations";

const schools = [
  { id: "1", name: "Greenfield Academy", location: "Lagos, Nigeria", students: 1247, type: "Both", status: "active" },
  { id: "2", name: "Lighthouse Secondary", location: "Abuja, Nigeria", students: 850, type: "Secondary", status: "active" },
  { id: "3", name: "St. Mary's Primary", location: "Port Harcourt", students: 420, type: "Primary", status: "inactive" },
];

export default function SchoolsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Schools</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage registered schools across the platform</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>Onboard School</Button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 sm:max-w-md">
          <Input placeholder="Search schools..." leftIcon={<Search className="h-4 w-4" />} />
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools.map((school) => (
          <Card key={school.id} padding="md" hover>
            <div className="flex justify-between items-start mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                <Building2 className="h-6 w-6" />
              </div>
              <Badge variant={school.status === "active" ? "success" : "secondary"}>{school.status}</Badge>
            </div>
            <h3 className="font-heading font-semibold text-lg truncate">{school.name}</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{school.location}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--border))]">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Students</p>
                <p className="font-semibold">{school.students.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Level</p>
                <p className="font-medium">{school.type}</p>
              </div>
              <Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
