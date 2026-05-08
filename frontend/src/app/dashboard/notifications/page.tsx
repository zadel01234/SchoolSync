"use client";

import { motion } from "framer-motion";
import { Bell, Megaphone, Plus, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatRelativeTime } from "@/lib/utils";

const notifications = [
  { id: "1", title: "Mid-term exam timetable released", message: "The timetable for the mid-term exams has been published. Please check the academics section.", type: "announcement", priority: "high" as const, isRead: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: "2", title: "Fee reminder: Outstanding balance", message: "23 students have outstanding fee balances for this term.", type: "alert", priority: "high" as const, isRead: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "3", title: "PTA meeting rescheduled", message: "The PTA meeting has been moved from Wednesday to Friday at 2:00 PM.", type: "announcement", priority: "medium" as const, isRead: true, createdAt: new Date(Date.now() - 18000000).toISOString() },
  { id: "4", title: "New student enrollment", message: "3 new students have been enrolled and assigned to their respective classes.", type: "system", priority: "low" as const, isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "5", title: "Sports day registration", message: "Sports day registration is now open. Students can register through their class teachers.", type: "announcement", priority: "low" as const, isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const priorityColors = { high: "destructive", medium: "warning", low: "secondary" } as const;

export default function NotificationsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Notifications</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{notifications.filter(n => !n.isRead).length} unread</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Mark all read</Button>
          <Button size="sm" leftIcon={<Megaphone className="h-4 w-4" />}>New Announcement</Button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} padding="md" className={`transition-colors ${!n.isRead ? "border-l-4 border-l-[hsl(var(--primary))] bg-[hsl(var(--primary))]/[0.02]" : ""}`}>
            <div className="flex items-start gap-4">
              <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${n.type === "announcement" ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]" : n.type === "alert" ? "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"}`}>
                {n.type === "announcement" ? <Megaphone className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`text-sm ${!n.isRead ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                  <Badge variant={priorityColors[n.priority]} className="text-[10px]">{n.priority}</Badge>
                </div>
                <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">{n.message}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{formatRelativeTime(n.createdAt)}</p>
              </div>
              {!n.isRead && <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[hsl(var(--primary))] shrink-0" />}
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
