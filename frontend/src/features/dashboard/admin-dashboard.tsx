"use client";

import { motion } from "framer-motion";
import { Users, ClipboardCheck, Receipt, UserCheck, Plus, Bell, FileText, Megaphone } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AttendanceRing } from "@/components/dashboard/attendance-ring";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

const recentActivity = [
  { id: "1", type: "enrollment", title: "New student enrolled", description: "David Okon was enrolled in JSS 2B", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "2", type: "payment", title: "Fee payment received", description: "₦45,000 from Mary Johnson (SSS 1A)", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "3", type: "announcement", title: "Announcement sent", description: "Mid-term exam timetable published", timestamp: new Date(Date.now() - 18000000).toISOString() },
  { id: "4", type: "attendance", title: "Attendance marked", description: "JSS 3A — 38/42 students present", timestamp: new Date(Date.now() - 36000000).toISOString() },
];

export function AdminDashboard() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>Add Student</Button>
          <Button size="sm" variant="outline" leftIcon={<Megaphone className="h-4 w-4" />}>Announce</Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,247" change={4.5} changeLabel="vs last term" icon={<Users className="h-5 w-5" />} variant="primary" />
        <StatCard title="Attendance Rate" value="94.2%" change={2.1} changeLabel="this week" icon={<ClipboardCheck className="h-5 w-5" />} variant="success" />
        <StatCard title="Fee Collected" value={formatCurrency(12450000)} change={12.3} changeLabel="this month" icon={<Receipt className="h-5 w-5" />} variant="warning" />
        <StatCard title="Active Staff" value="86" change={0} changeLabel="no change" icon={<UserCheck className="h-5 w-5" />} />
      </motion.div>

      {/* Charts & Activity */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Attendance Overview */}
        <Card padding="md" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around py-8">
              <AttendanceRing percentage={94} size={100} label="Overall" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-[hsl(var(--success))]" /><span>Present: 1,172</span></div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-[hsl(var(--destructive))]" /><span>Absent: 52</span></div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-[hsl(var(--warning))]" /><span>Late: 23</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Summary */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Fee Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-[hsl(var(--muted-foreground))]">Collected</span><span className="font-semibold text-[hsl(var(--success))]">{formatCurrency(12450000)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[hsl(var(--muted-foreground))]">Outstanding</span><span className="font-semibold text-[hsl(var(--destructive))]">{formatCurrency(3200000)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[hsl(var(--muted-foreground))]">Total Expected</span><span className="font-semibold">{formatCurrency(15650000)}</span></div>
            </div>
            <div className="h-2 w-full rounded-full bg-[hsl(var(--muted))] overflow-hidden">
              <div className="h-full rounded-full bg-[hsl(var(--success))]" style={{ width: "79.6%" }} />
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">79.6% collected this term</p>
            <Button variant="outline" size="sm" className="w-full">View Defaulters</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[hsl(var(--primary))] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-[hsl(var(--muted-foreground))] truncate">{item.description}</p>
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">{formatRelativeTime(item.timestamp)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
