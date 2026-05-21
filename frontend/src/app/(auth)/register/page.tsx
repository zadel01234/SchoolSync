"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  GraduationCap,
  User,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import { authApi } from "@/lib/api";

/* ------------------------------------------------------------------ */
/*  Password strength helper                                           */
/* ------------------------------------------------------------------ */
function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { score, label: "Fair", color: "bg-amber-500" };
  if (score === 3) return { score, label: "Good", color: "bg-emerald-400" };
  return { score, label: "Strong", color: "bg-emerald-600" };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  /* ---- Validation ---- */
  const validate = (): string | null => {
    if (!firstName.trim() || !lastName.trim())
      return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  /* ---- Submit ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.register({
        full_name: `${firstName.trim()} ${lastName.trim()}`,
        email,
        password,
        role: "admin",
      });

      register(
        response.user,
        { accessToken: response.accessToken, refreshToken: response.refreshToken }
      );

      // Route to select-role page after registration
      router.push("/select-role");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Mobile logo */}
      <div className="flex items-center gap-3 lg:hidden mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
          <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-heading font-bold">
          School<span className="text-[hsl(var(--primary))]">Sync</span>
        </span>
      </div>

      {/* Tab Switcher */}
      <div className="flex w-full rounded-xl bg-[hsl(var(--muted))] p-1 mb-6">
        <Link
          href="/login"
          className="w-1/2 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="w-1/2 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm"
        >
          Sign Up
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Set up your profile to get started with SchoolSync
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--destructive)/0.3)] bg-[hsl(var(--destructive)/0.05)] px-4 py-3 text-sm text-[hsl(var(--destructive))] animate-slide-up">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        id="register-form"
      >
        {/* ── Name ── */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="register-first-name"
            label="First name"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (error) setError("");
            }}
            leftIcon={<User className="h-4 w-4" />}
            required
            autoComplete="given-name"
          />
          <Input
            id="register-last-name"
            label="Last name"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (error) setError("");
            }}
            leftIcon={<User className="h-4 w-4" />}
            required
            autoComplete="family-name"
          />
        </div>

        {/* ── Email ── */}
        <Input
          id="register-email"
          label="Email address"
          type="email"
          placeholder="you@school.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          leftIcon={<Mail className="h-4 w-4" />}
          required
          autoComplete="email"
        />

        {/* ── Password ── */}
        <div className="space-y-2">
          <Input
            id="register-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-[hsl(var(--foreground))] transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            required
            autoComplete="new-password"
          />
          {/* Password strength meter */}
          {password.length > 0 && (
            <div className="space-y-1.5 animate-fade-in">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-300",
                      passwordStrength.score >= level
                        ? passwordStrength.color
                        : "bg-[hsl(var(--muted))]"
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Password strength:{" "}
                <span className="font-medium">{passwordStrength.label}</span>
              </p>
            </div>
          )}
        </div>

        {/* ── Confirm Password ── */}
        <div className="space-y-1">
          <Input
            id="register-confirm-password"
            label="Confirm password"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError("");
            }}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="hover:text-[hsl(var(--foreground))] transition-colors"
                tabIndex={-1}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            required
            autoComplete="new-password"
          />
          {passwordsMatch && (
            <p className="flex items-center gap-1 text-xs text-emerald-600 animate-fade-in">
              <CheckCircle2 className="h-3.5 w-3.5" /> Passwords match
            </p>
          )}
          {passwordsMismatch && (
            <p className="flex items-center gap-1 text-xs text-[hsl(var(--destructive))] animate-fade-in">
              <AlertCircle className="h-3.5 w-3.5" /> Passwords do not match
            </p>
          )}
        </div>



        {/* ── Submit ── */}
        <Button
          id="register-submit"
          type="submit"
          className="w-full"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
        >
          Create account
        </Button>
      </form>

      {/* ── Divider ── */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[hsl(var(--border))]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[hsl(var(--background))] px-3 text-[hsl(var(--muted-foreground))]">
            or continue with
          </span>
        </div>
      </div>

      {/* ── Social login ── */}
      <div className="grid grid-cols-2 gap-3">
        <Button id="register-google" variant="outline" size="lg" type="button">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button
          id="register-facebook"
          variant="outline"
          size="lg"
          type="button"
        >
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[hsl(var(--primary))] hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
