"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Download, MoreHorizontal, ChevronLeft, ChevronRight, X, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";

const initialStudents = [
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
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentSaved, setStudentSaved] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [studentForm, setStudentForm] = useState({ firstName: "", lastName: "", className: "", admissionNumber: "", gender: "male" });

  // Filter logic
  const filtered = students.filter((s) => {
    const matchesSearch = `${s.firstName} ${s.lastName} ${s.admissionNumber}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    const matchesGender = filterGender === "all" || s.gender === filterGender;
    return matchesSearch && matchesStatus && matchesGender;
  });

  // Export to CSV
  const handleExport = () => {
    const csvRows = [
      ["Name", "Admission No.", "Class", "Gender", "Status"],
      ...filtered.map((s) => [`${s.firstName} ${s.lastName}`, s.admissionNumber, s.className, s.gender, s.status]),
    ];
    const csvContent = csvRows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportDone(true);
    setTimeout(() => setExportDone(false), 2000);
  };

  // Add student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentSaved(true);
    setTimeout(() => {
      const newStudent = {
        id: String(Date.now()),
        ...studentForm,
        status: "active",
      };
      setStudents((prev) => [newStudent, ...prev]);
      setStudentSaved(false);
      setShowAddStudent(false);
      setStudentForm({ firstName: "", lastName: "", className: "", admissionNumber: "", gender: "male" });
    }, 1200);
  };

  const activeFilterCount = [filterStatus !== "all", filterGender !== "all"].filter(Boolean).length;

  return (
    <>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Students</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{students.length} students enrolled</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" leftIcon={<Download className="h-4 w-4" />} onClick={handleExport}>
              {exportDone ? "✓ Exported!" : "Export"}
            </Button>
            <Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAddStudent(true)}>Add Student</Button>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search className="h-4 w-4" />} />
          </div>
          <Button
            variant="outline"
            leftIcon={<Filter className="h-4 w-4" />}
            onClick={() => setShowFilter(true)}
            className="relative"
          >
            Filter
            {activeFilterCount > 0 && (
              <span className="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-1 text-[10px] font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
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
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">No students found matching your criteria.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-[hsl(var(--border))] px-4 py-3">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Showing {filtered.length} of {students.length}</p>
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
          {filtered.length === 0 && (
            <p className="text-center py-8 text-[hsl(var(--muted-foreground))]">No students found.</p>
          )}
        </motion.div>
      </motion.div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowFilter(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-6 py-4">
                <h2 className="text-lg font-heading font-semibold">Filter Students</h2>
                <button onClick={() => setShowFilter(false)} className="rounded-lg p-1 hover:bg-[hsl(var(--muted))] transition-colors">
                  <X className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Status</label>
                  <div className="flex gap-2 flex-wrap">
                    {["all", "active", "inactive", "graduated", "transferred"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFilterStatus(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
                          filterStatus === s
                            ? "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                            : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                        }`}
                      >
                        {s === "all" ? "All" : s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Gender</label>
                  <div className="flex gap-2">
                    {["all", "male", "female"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFilterGender(g)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
                          filterGender === g
                            ? "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                            : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                        }`}
                      >
                        {g === "all" ? "All" : g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => { setFilterStatus("all"); setFilterGender("all"); }}>Reset</Button>
                  <Button onClick={() => setShowFilter(false)} leftIcon={<Filter className="h-4 w-4" />}>Apply</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Student Modal */}
      <AnimatePresence>
        {showAddStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowAddStudent(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-6 py-4">
                <h2 className="text-lg font-heading font-semibold">Add New Student</h2>
                <button onClick={() => setShowAddStudent(false)} className="rounded-lg p-1 hover:bg-[hsl(var(--muted))] transition-colors">
                  <X className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>
              <div className="px-6 py-4">
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
