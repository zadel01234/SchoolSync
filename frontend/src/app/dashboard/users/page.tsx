"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Search, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { schoolApi } from "@/lib/api";
import { InviteStaffModal } from "@/components/dashboard/invite-staff-modal";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const data = await schoolApi.getStaff();
      const staffList = Array.isArray(data) ? data : data?.staff || [];
      setUsers(staffList);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <InviteStaffModal 
        open={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        onInvited={fetchStaff} 
      />
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">User Management</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage access control and user accounts</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setIsInviteOpen(true)} leftIcon={<UserPlus className="h-4 w-4" />}>
            Invite User
          </Button>
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
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-8 text-[hsl(var(--muted-foreground))]">Loading staff...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-[hsl(var(--muted-foreground))]">No staff members found. Invite some!</td></tr>
              ) : (
                users.map((u) => {
                  const displayName = u.full_name || (u.firstName ? `${u.firstName} ${u.lastName}` : "") || "Unnamed User";
                  return (
                    <tr key={u.id || u.email} className="hover:bg-[hsl(var(--muted))]/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={displayName} size="sm" />
                          <div>
                            <span className="font-medium block">{displayName}</span>
                            <span className="text-xs text-[hsl(var(--muted-foreground))]">{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="capitalize flex w-fit items-center gap-1">
                          {u.role === "super_admin" && <ShieldCheck className="h-3 w-3 text-[hsl(var(--primary))]" />}
                          {u.role ? u.role.replace("_", " ") : "User"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-[hsl(var(--muted-foreground))]">{u.school?.name || "N/A"}</td>
                      <td className="px-4 py-3">
                        <Badge variant={u.isActive ? "success" : "warning"} dot>
                          {u.isActive ? "Active" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">Manage</Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
