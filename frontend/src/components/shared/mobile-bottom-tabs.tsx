"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { mobileTabConfig, iconMap } from "@/config/navigation";

export function MobileBottomTabs() {
  const pathname = usePathname();
  const { user, activeRole } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const role = activeRole || user?.role || "school_admin";
  const tabs = mobileTabConfig[role] || [];

  if (!isMounted) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-md px-2 pb-[env(safe-area-inset-bottom)] md:hidden"
        style={{ height: "72px" }}
      />
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-md px-2 pb-[env(safe-area-inset-bottom)] md:hidden"
      style={{ height: "72px" }}
    >
      {tabs.map((tab) => {
        const Icon = iconMap[tab.icon];
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + "/");

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] rounded-lg transition-colors",
              isActive
                ? "text-[hsl(var(--primary))]"
                : "text-[hsl(var(--muted-foreground))]"
            )}
          >
            {Icon && <Icon className={cn("h-5 w-5", isActive && "scale-110")} />}
            <span className="text-[10px] font-medium">{tab.label}</span>
            {isActive && (
              <div className="absolute top-0 h-0.5 w-8 rounded-full bg-[hsl(var(--primary))]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
