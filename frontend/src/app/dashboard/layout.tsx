"use client";

import { Sidebar } from "@/components/shared/sidebar";
import { TopNavbar } from "@/components/shared/top-navbar";
import { MobileBottomTabs } from "@/components/shared/mobile-bottom-tabs";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Top navbar */}
      <TopNavbar />

      {/* Main content */}
      <main
        className={cn(
          "pt-16 pb-20 md:pb-0 transition-all duration-300 min-h-screen",
          "md:ml-[260px]",
          sidebarCollapsed && "md:ml-[72px]"
        )}
      >
        <div className="p-4 md:p-6 lg:p-8 max-w-[1400px]">
          {children}
        </div>
      </main>

      {/* Mobile bottom tabs */}
      <MobileBottomTabs />
    </div>
  );
}
