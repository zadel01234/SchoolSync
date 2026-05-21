"use client";

import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { schoolApi } from "@/lib/api";

export function InviteStaffModal({
  open,
  onClose,
  onInvited,
}: {
  open: boolean;
  onClose: () => void;
  onInvited: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("teacher");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const apiRole = role === "school_admin" ? "admin" : role;
      await schoolApi.inviteStaff({ 
        full_name: fullName, 
        email, 
        role: apiRole 
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFullName("");
        setEmail("");
        setRole("teacher");
        onInvited();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send invitation.");
    } finally {
      setIsLoading(false);
    }
  };

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
            className="w-full max-w-md rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-6 py-4">
              <h2 className="text-lg font-heading font-semibold">Invite Staff</h2>
              <button onClick={onClose} className="rounded-lg p-1 hover:bg-[hsl(var(--muted))] transition-colors">
                <X className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
              </button>
            </div>
            
            <div className="px-6 py-4">
              {success ? (
                <div className="flex flex-col items-center gap-3 py-8 animate-fade-in">
                  <CheckCircle2 className="h-12 w-12 text-[hsl(var(--success))]" />
                  <p className="font-semibold text-lg">Invitation Sent!</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">An email has been sent to {email}.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive" title="Error">
                      {error}
                    </Alert>
                  )}
                  
                  <Input
                    label="Full Name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Mrs. Adaeze Obi"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. teacher@school.com"
                  />
                  
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Role</label>
                    <div className="flex gap-2 flex-wrap">
                      {["teacher", "school_admin"].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
                            role === r
                              ? "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                              : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                          }`}
                        >
                          {r.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[hsl(var(--border))]">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" loading={isLoading} leftIcon={<Send className="h-4 w-4" />}>
                      Send Invite
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
