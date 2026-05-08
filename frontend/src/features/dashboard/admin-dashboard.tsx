"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ClipboardCheck, Receipt, UserCheck, Plus, Bell, FileText,
  Megaphone, X, Download, Filter, AlertTriangle, CheckCircle2, Send,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AttendanceRing } from "@/components/dashboard/attendance-ring";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */
const recentActivity = [
  { id: "1", type: "enrollment", title: "New student enrolled", description: "David Okon was enrolled in JSS 2B", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "2", type: "payment", title: "Fee payment received", description: "₦45,000 from Mary Johnson (SSS 1A)", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "3", type: "announcement", title: "Announcement sent", description: "Mid-term exam timetable published", timestamp: new Date(Date.now() - 18000000).toISOString() },
  { id: "4", type: "attendance", title: "Attendance marked", description: "JSS 3A — 38/42 students present", timestamp: new Date(Date.now() - 36000000).toISOString() },
  { id: "5", type: "payment", title: "Fee payment received", description: "₦55,000 from Peter Musa (SSS 3A)", timestamp: new Date(Date.now() - 50000000).toISOString() },
  { id: "6", type: "enrollment", title: "Student transferred", description: "Grace Ojo transferred to JSS 2A", timestamp: new Date(Date.now() - 72000000).toISOString() },
];

const defaulters = [
  { id: "1", name: "Michael Ibrahim", className: "SSS 1A", amount: 55000, paid: 0 },
  { id: "2", name: "Faith Nwosu", className: "JSS 3B", amount: 45000, paid: 0 },
  { id: "3", name: "Sarah Adeleke", className: "JSS 2A", amount: 45000, paid: 20000 },
  { id: "4", name: "Chukwuma Eze", className: "SSS 2B", amount: 55000, paid: 10000 },
  { id: "5", name: "Amina Yusuf", className: "JSS 1B", amount: 40000, paid: 5000 },
];

/* ------------------------------------------------------------------ */
/*  Reusable Modal Overlay                                             */
/* ------------------------------------------------------------------ */
function ModalOverlay({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className={`w-full ${maxWidth} rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-xl overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-6 py-4">
              <h2 className="text-lg font-heading font-semibold">{title}</h2>
              <button onClick={onClose} className="rounded-lg p-1 hover:bg-[hsl(var(--muted))] transition-colors">
                <X className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
              </button>
            </div>
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard Component                                                */
/* ------------------------------------------------------------------ */
export function AdminDashboard() {
  const router = useRouter();

  // Modal states
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAnnounce, setShowAnnounce] = useState(false);
  const [showDefaulters, setShowDefaulters] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExportDone, setShowExportDone] = useState(false);

  // Add student form
  const [studentForm, setStudentForm] = useState({ firstName: "", lastName: "", className: "", admissionNumber: "", gender: "male" });
  const [studentSaved, setStudentSaved] = useState(false);

  // Announcement form
  const [announcement, setAnnouncement] = useState({ title: "", message: "", priority: "medium" });
  const [announcementSent, setAnnouncementSent] = useState(false);

  // Filter state
  const [filterTerm, setFilterTerm] = useState("all");

  /* -- handlers -- */
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentSaved(true);
    setTimeout(() => {
      setStudentSaved(false);
      setShowAddStudent(false);
      setStudentForm({ firstName: "", lastName: "", className: "", admissionNumber: "", gender: "male" });
    }, 1500);
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncementSent(true);
    setTimeout(() => {
      setAnnouncementSent(false);
      setShowAnnounce(false);
      setAnnouncement({ title: "", message: "", priority: "medium" });
    }, 1500);
  };

  const handleExport = () => {
    // Build CSV content from mock data
    const csvRows = [
      ["Type", "Title", "Description", "Time"],
      ...recentActivity.map((a) => [a.type, a.title, a.description, new Date(a.timestamp).toLocaleString()]),
    ];
    const csvContent = csvRows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schoolsync-dashboard-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportDone(true);
    setTimeout(() => setShowExportDone(false), 2000);
  };

  return (
    <>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
        {/* Header */}
        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" leftIcon={<Filter className="h-4 w-4" />} variant="outline" onClick={() => setShowFilter(true)}>
              Filter
            </Button>
            <Button size="sm" leftIcon={<Download className="h-4 w-4" />} variant="outline" onClick={handleExport}>
              {showExportDone ? "✓ Exported!" : "Export"}
            </Button>
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAddStudent(true)}>Add Student</Button>
            <Button size="sm" variant="outline" leftIcon={<Megaphone className="h-4 w-4" />} onClick={() => setShowAnnounce(true)}>Announce</Button>
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
              <Button variant="outline" size="sm" className="w-full" leftIcon={<AlertTriangle className="h-4 w-4" />} onClick={() => setShowDefaulters(true)}>
                View Defaulters
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={staggerItem}>
          <Card padding="md">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAllActivity(true)}>View all</Button>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                {recentActivity.slice(0, 4).map((item) => (
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

      {/* ============================================================ */}
      {/*  MODAL: Add Student                                           */}
      {/* ============================================================ */}
      <ModalOverlay open={showAddStudent} onClose={() => setShowAddStudent(false)} title="Add New Student">
        {studentSaved ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle2 className="h-12 w-12 text-[hsl(var(--success))]" />
            <p className="font-semibold text-lg">Student Added!</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">The student has been enrolled successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" required value={studentForm.firstName} onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })} placeholder="e.g. David" />
              <Input label="Last Name" required value={studentForm.lastName} onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })} placeholder="e.g. Okon" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Class" required value={studentForm.className} onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })} placeholder="e.g. JSS 2B" />
              <Input label="Admission No." required value={studentForm.admissionNumber} onChange={(e) => setStudentForm({ ...studentForm, admissionNumber: e.target.value })} placeholder="e.g. SS-2025-009" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Gender</label>
              <div className="flex gap-4">
                {["male", "female"].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={studentForm.gender === g}
                      onChange={() => setStudentForm({ ...studentForm, gender: g })}
                      className="h-4 w-4 border-[hsl(var(--border))] text-[hsl(var(--primary))]"
                    />
                    <span className="text-sm capitalize">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAddStudent(false)}>Cancel</Button>
              <Button type="submit" leftIcon={<Plus className="h-4 w-4" />}>Add Student</Button>
            </div>
          </form>
        )}
      </ModalOverlay>

      {/* ============================================================ */}
      {/*  MODAL: Send Announcement                                     */}
      {/* ============================================================ */}
      <ModalOverlay open={showAnnounce} onClose={() => setShowAnnounce(false)} title="New Announcement">
        {announcementSent ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle2 className="h-12 w-12 text-[hsl(var(--success))]" />
            <p className="font-semibold text-lg">Announcement Sent!</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">All users have been notified.</p>
          </div>
        ) : (
          <form onSubmit={handleSendAnnouncement} className="space-y-4">
            <Input label="Title" required value={announcement.title} onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })} placeholder="e.g. Mid-term exam schedule" />
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea
                required
                rows={4}
                value={announcement.message}
                onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                placeholder="Write your announcement here..."
                className="flex w-full rounded-lg border border-[hsl(var(--border))] bg-transparent px-3 py-2 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Priority</label>
              <div className="flex gap-2">
                {(["low", "medium", "high"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAnnouncement({ ...announcement, priority: p })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
                      announcement.priority === p
                        ? p === "high"
                          ? "bg-[hsl(var(--destructive))]/10 border-[hsl(var(--destructive))] text-[hsl(var(--destructive))]"
                          : p === "medium"
                          ? "bg-[hsl(var(--warning))]/10 border-[hsl(var(--warning))] text-[hsl(var(--warning))]"
                          : "bg-[hsl(var(--success))]/10 border-[hsl(var(--success))] text-[hsl(var(--success))]"
                        : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAnnounce(false)}>Cancel</Button>
              <Button type="submit" leftIcon={<Send className="h-4 w-4" />}>Send Announcement</Button>
            </div>
          </form>
        )}
      </ModalOverlay>

      {/* ============================================================ */}
      {/*  MODAL: View Defaulters                                       */}
      {/* ============================================================ */}
      <ModalOverlay open={showDefaulters} onClose={() => setShowDefaulters(false)} title="Fee Defaulters" maxWidth="max-w-xl">
        <div className="space-y-3">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{defaulters.length} students with outstanding fees</p>
          {defaulters.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] p-3">
              <div>
                <p className="font-medium text-sm">{d.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{d.className}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[hsl(var(--destructive))]">{formatCurrency(d.amount - d.paid)}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">of {formatCurrency(d.amount)}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" onClick={() => { setShowDefaulters(false); router.push("/dashboard/fees"); }}>
              Go to Fee Management
            </Button>
          </div>
        </div>
      </ModalOverlay>

      {/* ============================================================ */}
      {/*  MODAL: View All Activity                                     */}
      {/* ============================================================ */}
      <ModalOverlay open={showAllActivity} onClose={() => setShowAllActivity(false)} title="All Recent Activity" maxWidth="max-w-xl">
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-3 text-sm">
              <div className="mt-1 h-2 w-2 rounded-full bg-[hsl(var(--primary))] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{item.title}</p>
                <p className="text-[hsl(var(--muted-foreground))]">{item.description}</p>
              </div>
              <span className="text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">{formatRelativeTime(item.timestamp)}</span>
            </div>
          ))}
        </div>
      </ModalOverlay>

      {/* ============================================================ */}
      {/*  MODAL: Filter                                                */}
      {/* ============================================================ */}
      <ModalOverlay open={showFilter} onClose={() => setShowFilter(false)} title="Filter Dashboard">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Term</label>
            <div className="flex gap-2 flex-wrap">
              {["all", "First Term", "Second Term", "Third Term"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilterTerm(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    filterTerm === t
                      ? "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                      : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                  }`}
                >
                  {t === "all" ? "All Terms" : t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => { setFilterTerm("all"); setShowFilter(false); }}>Reset</Button>
            <Button onClick={() => setShowFilter(false)} leftIcon={<Filter className="h-4 w-4" />}>Apply Filter</Button>
          </div>
        </div>
      </ModalOverlay>
    </>
  );
}
