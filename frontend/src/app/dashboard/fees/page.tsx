"use client";

import { motion } from "framer-motion";
import { Receipt, AlertTriangle, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCurrency } from "@/lib/utils";

const feeRecords = [
  { id: "1", student: "David Okon", className: "JSS 2B", feeType: "Tuition", amount: 45000, paid: 45000, status: "paid" as const },
  { id: "2", student: "Sarah Adeleke", className: "JSS 2A", feeType: "Tuition", amount: 45000, paid: 20000, status: "partial" as const },
  { id: "3", student: "Michael Ibrahim", className: "SSS 1A", feeType: "Tuition", amount: 55000, paid: 0, status: "unpaid" as const },
  { id: "4", student: "Faith Nwosu", className: "JSS 3B", feeType: "Tuition", amount: 45000, paid: 0, status: "overdue" as const },
  { id: "5", student: "Emmanuel Bassey", className: "SSS 2A", feeType: "Tuition", amount: 55000, paid: 55000, status: "paid" as const },
  { id: "6", student: "Grace Ojo", className: "JSS 1A", feeType: "Tuition", amount: 40000, paid: 40000, status: "paid" as const },
];

const statusVariant = { paid: "success", partial: "warning", unpaid: "secondary", overdue: "destructive" } as const;

export default function FeesPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-heading font-bold">Fee Management</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Track payments and manage invoices</p>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Collected" value={formatCurrency(12450000)} change={12.3} changeLabel="this month" icon={<Receipt className="h-5 w-5" />} variant="success" />
        <StatCard title="Outstanding" value={formatCurrency(3200000)} icon={<Receipt className="h-5 w-5" />} variant="danger" />
        <StatCard title="Defaulters" value="23 students" icon={<AlertTriangle className="h-5 w-5" />} variant="warning" />
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><Input placeholder="Search by student name..." leftIcon={<Search className="h-4 w-4" />} /></div>
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>Filter</Button>
      </motion.div>

      {/* Desktop Table */}
      <motion.div variants={staggerItem} className="hidden md:block">
        <Card padding="none" className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Student</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Class</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Fee Type</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--muted-foreground))]">Amount</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--muted-foreground))]">Paid</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--muted-foreground))]">Balance</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map((r) => (
                <tr key={r.id} className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={r.student} size="xs" />
                      <span className="font-medium">{r.student}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{r.className}</td>
                  <td className="px-4 py-3">{r.feeType}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(r.amount)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(r.paid)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(r.amount - r.paid)}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant[r.status]} dot>{r.status}</Badge></td>
                  <td className="px-4 py-3 text-right"><Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-[hsl(var(--border))] px-4 py-3">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Showing 6 of 6</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon-sm"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon-sm"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Mobile Cards */}
      <motion.div variants={staggerItem} className="md:hidden space-y-3">
        {feeRecords.map((r) => (
          <Card key={r.id} padding="md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><UserAvatar name={r.student} size="sm" /><div><p className="font-semibold text-sm">{r.student}</p><p className="text-xs text-[hsl(var(--muted-foreground))]">{r.className}</p></div></div>
              <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><p className="text-[hsl(var(--muted-foreground))]">Amount</p><p className="font-semibold">{formatCurrency(r.amount)}</p></div>
              <div><p className="text-[hsl(var(--muted-foreground))]">Paid</p><p className="font-semibold text-[hsl(var(--success))]">{formatCurrency(r.paid)}</p></div>
              <div><p className="text-[hsl(var(--muted-foreground))]">Balance</p><p className="font-semibold text-[hsl(var(--destructive))]">{formatCurrency(r.amount - r.paid)}</p></div>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
