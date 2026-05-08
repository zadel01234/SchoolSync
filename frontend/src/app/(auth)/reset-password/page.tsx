"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

function getStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s += 25;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 25;
  if (/\d/.test(pw)) s += 25;
  if (/[^a-zA-Z\d]/.test(pw)) s += 25;
  return s;
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const strength = getStrength(password);
  const variant = strength <= 25 ? "destructive" as const : strength <= 75 ? "warning" as const : "success" as const;
  const label = strength <= 25 ? "Weak" : strength <= 50 ? "Fair" : strength <= 75 ? "Good" : "Strong";

  if (done) {
    return (
      <div className="space-y-6 text-center animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--success))]/10">
          <CheckCircle2 className="h-8 w-8 text-[hsl(var(--success))]" />
        </div>
        <h1 className="text-2xl font-heading font-bold">Password reset!</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Your password has been successfully updated.</p>
        <Link href="/login"><Button className="w-full" size="lg">Back to login</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <Link href="/verify-otp" className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
        <ArrowLeft className="h-4 w-4" />Back
      </Link>
      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold">Set new password</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Must be at least 8 characters.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500); }} className="space-y-4">
        <Input label="New password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password}
          onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={<button type="button" onClick={() => setShowPw(!showPw)} tabIndex={-1}>{showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>} required />
        {password && <div className="space-y-1"><Progress value={strength} variant={variant} /><p className="text-xs text-[hsl(var(--muted-foreground))]">{label}</p></div>}
        <Input label="Confirm password" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />} error={confirm && confirm !== password ? "Passwords don't match" : undefined} required />
        <Button type="submit" className="w-full" size="lg" loading={loading} disabled={!password || password !== confirm || strength < 50}>Reset password</Button>
      </form>
    </div>
  );
}
