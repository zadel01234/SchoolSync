"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { navigationConfig, iconMap } from "@/config/navigation";
import { ChevronLeft, LogOut, GraduationCap } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user, activeRole, logout } = useAuthStore();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const role = activeRole || user?.role || "school_admin";
  const navItems = navigationConfig[role] || [];

  if (!isMounted) {
    return (
      <aside
        className={cn(
          "fixed left-0 top-0 z-[100] flex h-full flex-col border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-bg))] transition-all duration-300",
          sidebarCollapsed ? "w-[72px]" : "w-[260px]"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-[hsl(var(--sidebar-border))] px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-[100] flex h-full flex-col border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-bg))] transition-all duration-300",
        sidebarCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-[hsl(var(--sidebar-border))] px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <span className="font-heading text-lg font-bold tracking-tight">
            School<span className="text-[hsl(var(--primary))]">Sync</span>
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--sidebar-active))] text-[hsl(var(--sidebar-active-foreground))]"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              {Icon && <Icon className="h-5 w-5 shrink-0" />}
              {!sidebarCollapsed && <span>{item.label}</span>}
              {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(var(--primary))] px-1.5 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-3 space-y-2">
        <button
          onClick={toggleSidebarCollapse}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", sidebarCollapsed && "rotate-180")} />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/5 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!sidebarCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
