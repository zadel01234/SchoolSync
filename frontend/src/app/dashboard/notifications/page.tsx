"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Megaphone, CheckCircle2, Send, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatRelativeTime } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

const initialNotifications = [
  { id: "1", title: "Mid-term exam timetable released", message: "The timetable for the mid-term exams has been published. Please check the academics section.", type: "announcement", priority: "high" as const, isRead: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: "2", title: "Fee reminder: Outstanding balance", message: "23 students have outstanding fee balances for this term.", type: "alert", priority: "high" as const, isRead: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "3", title: "PTA meeting rescheduled", message: "The PTA meeting has been moved from Wednesday to Friday at 2:00 PM.", type: "announcement", priority: "medium" as const, isRead: true, createdAt: new Date(Date.now() - 18000000).toISOString() },
  { id: "4", title: "New student enrollment", message: "3 new students have been enrolled and assigned to their respective classes.", type: "system", priority: "low" as const, isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "5", title: "Sports day registration", message: "Sports day registration is now open. Students can register through their class teachers.", type: "announcement", priority: "low" as const, isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const priorityColors = { high: "destructive", medium: "warning", low: "secondary" } as const;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showAnnounce, setShowAnnounce] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: "", message: "", priority: "medium" });
  const [announcementSent, setAnnouncementSent] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncementSent(true);
    setTimeout(() => {
      // Add the new announcement to the top of the list
      const newNotification = {
        id: String(Date.now()),
        title: announcement.title,
        message: announcement.message,
        type: "announcement",
        priority: announcement.priority as "high" | "medium" | "low",
        isRead: true,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setAnnouncementSent(false);
      setShowAnnounce(false);
      setAnnouncement({ title: "", message: "", priority: "medium" });
    }, 1500);
  };

  return (
    <>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Notifications</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{unreadCount} unread</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
            >
              Mark all read
            </Button>
            <Button size="sm" leftIcon={<Megaphone className="h-4 w-4" />} onClick={() => setShowAnnounce(true)}>
              New Announcement
            </Button>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n.id}
              padding="md"
              className={`transition-colors cursor-pointer ${!n.isRead ? "border-l-4 border-l-[hsl(var(--primary))] bg-[hsl(var(--primary))]/[0.02]" : ""}`}
              onClick={() => handleMarkRead(n.id)}
            >
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

      {/* Announcement Modal */}
      <AnimatePresence>
        {showAnnounce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowAnnounce(false)}
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
                <h2 className="text-lg font-heading font-semibold">New Announcement</h2>
                <button onClick={() => setShowAnnounce(false)} className="rounded-lg p-1 hover:bg-[hsl(var(--muted))] transition-colors">
                  <X className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                </button>
              </div>
              <div className="px-6 py-4">
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
