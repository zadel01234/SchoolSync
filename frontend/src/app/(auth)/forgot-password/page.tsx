"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold tracking-tight">Forgot password?</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          No worries. Enter your email and we&apos;ll send you a reset code.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" title="Error">
          {error}
        </Alert>
      )}

      {sent ? (
        <Alert variant="success" title="Check your email">
          We sent a password reset code to <strong>{email}</strong>. It expires in 10 minutes.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@school.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />
          <Button type="submit" className="w-full" size="lg" loading={isLoading}>
            Send reset code
          </Button>
        </form>
      )}

      {sent && (
        <div className="space-y-3">
          <Link href="/verify-otp">
            <Button className="w-full" size="lg">
              Enter code
            </Button>
          </Link>
          <button
            onClick={() => setSent(false)}
            className="w-full text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
          >
            Didn&apos;t receive the email? Resend
          </button>
        </div>
      )}
    </div>
  );
}
