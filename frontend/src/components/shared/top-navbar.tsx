"use client";

import { Bell, Search, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { UserAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TopNavbar() {
  const { user } = useAuthStore();
  const { sidebarCollapsed, setMobileMenuOpen } = useUIStore();
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-[90] flex h-16 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md px-4 md:px-6 transition-all duration-300",
        "left-0 md:left-[260px]",
        sidebarCollapsed && "md:left-[72px]"
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden md:flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-3 py-1.5 text-sm text-[hsl(var(--muted-foreground))]">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-4 rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
        </Button>

        <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--destructive))] text-[9px] font-bold text-white">
            3
          </span>
        </Button>

        {user && (
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[hsl(var(--border))]">
            <UserAvatar name={`${user.firstName} ${user.lastName}`} src={user.avatar} size="sm" />
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">{user.firstName}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">{user.role.replace("_", " ")}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
