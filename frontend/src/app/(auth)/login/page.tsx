"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, GraduationCap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Simulate login API call — replace with real API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock: authenticate and return existing user data from backend
      // In production, the API returns the user's role, setup status, etc.
      login(
        {
          id: "1",
          email,
          firstName: "Admin",
          lastName: "User",
          role: "school_admin",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { accessToken: "mock-token", refreshToken: "mock-refresh" },
        true // hasCompletedSetup — existing users have already completed onboarding
      );

      // Returning users go straight to their dashboard
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
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
      <div className="flex w-full rounded-xl bg-[hsl(var(--muted))] p-1">
        <Link
          href="/login"
          className="w-1/2 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="w-1/2 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
        >
          Sign Up
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--destructive)/0.3)] bg-[hsl(var(--destructive)/0.05)] px-4 py-3 text-sm text-[hsl(var(--destructive))] animate-slide-up">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
        <Input
          id="login-email"
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

        <div className="space-y-1.5">
          <Input
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label
            htmlFor="remember-me"
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))]"
            />
            <span className="text-[hsl(var(--muted-foreground))]">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[hsl(var(--primary))] hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          id="login-submit"
          type="submit"
          className="w-full"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign in
        </Button>
      </form>

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

      <div className="grid grid-cols-2 gap-3">
        <Button id="login-google" variant="outline" size="lg" type="button">
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
        <Button id="login-facebook" variant="outline" size="lg" type="button">
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[hsl(var(--primary))] hover:underline font-medium"
        >
          Get started
        </Link>
      </p>
    </div>
  );
}
