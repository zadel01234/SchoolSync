"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "2fa" or "reset"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { login } = useAuthStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    setIsLoading(true);
    setError("");

    try {
      if (type === "2fa") {
        const response = await authApi.verify2fa({ token });
        login(
          response.user,
          { accessToken: response.accessToken, refreshToken: response.refreshToken },
          true
        );
        router.push("/dashboard");
      } else {
        // For password reset flow
        // The token would normally be verified here or passed to reset-password page
        router.push(`/reset-password?token=${token}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Link href="/forgot-password" className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
        <ArrowLeft className="h-4 w-4" />Back to previous
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold tracking-tight">
          {type === "2fa" ? "Two-Factor Authentication" : "Verify your email"}
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {type === "2fa"
            ? "Enter the 6-digit code from your authenticator app."
            : "Enter the 6-digit code we sent to your email address."}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" title="Error">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-12 rounded-xl border-2 border-[hsl(var(--border))] bg-transparent text-center text-xl font-bold focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/20 transition-all"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isLoading} disabled={otp.some((d) => !d)}>
          Verify code
        </Button>
      </form>

      <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        {countdown > 0 ? (
          <>Resend code in <span className="font-medium text-[hsl(var(--foreground))]">{countdown}s</span></>
        ) : (
          <button onClick={() => setCountdown(60)} className="text-[hsl(var(--primary))] hover:underline font-medium">Resend code</button>
        )}
      </p>
    </div>
  );
}
