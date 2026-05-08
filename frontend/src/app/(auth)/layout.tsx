import { GraduationCap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between gradient-primary p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-heading font-bold">SchoolSync</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-heading font-bold leading-tight">
            Manage your school
            <br />
            with confidence.
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Attendance, fees, academics, and parent communication — all in one
            simple, powerful platform built for schools that move fast.
          </p>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-2xl font-bold">2,500+</p>
              <p className="text-white/60">Schools</p>
            </div>
            <div>
              <p className="text-2xl font-bold">500K+</p>
              <p className="text-white/60">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-white/60">Uptime</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/40">© 2025 SchoolSync. All rights reserved.</p>
      </div>

      {/* Right panel - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
