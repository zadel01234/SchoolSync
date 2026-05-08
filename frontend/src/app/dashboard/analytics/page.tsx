"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Receipt } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">Platform Analytics</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">System-wide metrics and performance</p>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Schools" value="142" change={12} changeLabel="this month" icon={<BarChart3 className="h-5 w-5" />} variant="primary" />
        <StatCard title="Total Students" value="45,280" change={5.2} changeLabel="this month" icon={<Users className="h-5 w-5" />} variant="success" />
        <StatCard title="Active Users" value="12,450" change={2.1} changeLabel="this week" icon={<TrendingUp className="h-5 w-5" />} variant="warning" />
        <StatCard title="Revenue Flow" value={formatCurrency(450000000)} change={8.4} changeLabel="this term" icon={<Receipt className="h-5 w-5" />} />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card padding="lg" className="min-h-[300px] flex items-center justify-center bg-[hsl(var(--muted))]/30">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-[hsl(var(--muted-foreground))] mx-auto mb-4 opacity-50" />
            <p className="font-medium text-[hsl(var(--muted-foreground))]">Growth Chart Placeholder</p>
          </div>
        </Card>
        <Card padding="lg" className="min-h-[300px] flex items-center justify-center bg-[hsl(var(--muted))]/30">
          <div className="text-center">
            <Users className="h-12 w-12 text-[hsl(var(--muted-foreground))] mx-auto mb-4 opacity-50" />
            <p className="font-medium text-[hsl(var(--muted-foreground))]">Demographics Chart Placeholder</p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
