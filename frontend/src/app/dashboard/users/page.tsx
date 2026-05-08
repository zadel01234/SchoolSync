"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Search, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";

const users = [
  { id: "1", name: "David Okon", email: "david@greenfield.edu", role: "school_admin", school: "Greenfield Academy", status: "active" },
  { id: "2", name: "Sarah Adeleke", email: "sarah@lighthouse.edu", role: "teacher", school: "Lighthouse Secondary", status: "active" },
  { id: "3", name: "Michael Ibrahim", email: "michael@greenfield.edu", role: "parent", school: "Greenfield Academy", status: "active" },
  { id: "4", name: "System Admin", email: "admin@schoolsync.app", role: "super_admin", school: "System", status: "active" },
];

export default function UsersPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">User Management</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage access control and user accounts</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" leftIcon={<UserPlus className="h-4 w-4" />}>Invite User</Button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 sm:max-w-md">
          <Input placeholder="Search by name or email..." leftIcon={<Search className="h-4 w-4" />} />
        </div>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none" className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">User</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Role</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">School</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[hsl(var(--muted))]/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={u.name} size="sm" />
                      <div>
                        <span className="font-medium block">{u.name}</span>
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="capitalize flex w-fit items-center gap-1">
                      {u.role === "super_admin" && <ShieldCheck className="h-3 w-3 text-[hsl(var(--primary))]" />}
                      {u.role.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{u.school}</td>
                  <td className="px-4 py-3"><Badge variant="success" dot>Active</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
