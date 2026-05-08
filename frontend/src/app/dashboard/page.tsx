"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardRootPage() {
  const router = useRouter();
  const { activeRole } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (activeRole === "super_admin" || activeRole === "school_admin") {
        router.replace("/dashboard/admin");
      } else if (activeRole) {
        router.replace(`/dashboard/${activeRole}`);
      } else {
        router.replace("/login");
      }
    }
  }, [isMounted, activeRole, router]);

  return <div className="space-y-4"><Skeleton className="h-[200px] w-full" /><Skeleton className="h-[400px] w-full" /></div>;
}
