import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  Receipt,
  BookOpen,
  Bell,
  Settings,
  School,
  BarChart3,
  Calendar,
  FileText,
  UserCheck,
  Home,
  BookOpenCheck,
  ClipboardList,
} from "lucide-react";
import type { UserRole, NavItem } from "@/types";

/**
 * Navigation configuration per user role
 */
export const navigationConfig: Record<UserRole, NavItem[]> = {
  super_admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { label: "Schools", href: "/dashboard/schools", icon: "School" },
    { label: "Users", href: "/dashboard/users", icon: "Users" },
    { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
    { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
  ],
  school_admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { label: "Staff", href: "/dashboard/users", icon: "Users" },
    { label: "Students", href: "/dashboard/students", icon: "GraduationCap" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "ClipboardCheck" },
    { label: "Fees", href: "/dashboard/fees", icon: "Receipt" },
    { label: "Academics", href: "/dashboard/academics", icon: "BookOpen" },
    { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
    { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
  ],
  teacher: [
    { label: "Dashboard", href: "/dashboard/teacher", icon: "LayoutDashboard" },
    { label: "My Classes", href: "/dashboard/classes", icon: "Users" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "ClipboardCheck" },
    { label: "Assignments", href: "/dashboard/assignments", icon: "FileText" },
    { label: "Results", href: "/dashboard/results", icon: "ClipboardList" },
    { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  ],
  parent: [
    { label: "Dashboard", href: "/dashboard/parent", icon: "Home" },
    { label: "Children", href: "/dashboard/children", icon: "Users" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "ClipboardCheck" },
    { label: "Fees", href: "/dashboard/fees", icon: "Receipt" },
    { label: "Academics", href: "/dashboard/academics", icon: "BookOpen" },
    { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  ],
  student: [
    { label: "Home", href: "/dashboard/student", icon: "Home" },
    { label: "Timetable", href: "/dashboard/timetable", icon: "Calendar" },
    { label: "Assignments", href: "/dashboard/assignments", icon: "BookOpenCheck" },
    { label: "Results", href: "/dashboard/results", icon: "ClipboardList" },
    { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  ],
};

/**
 * Icon mapping for navigation items
 */
export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  Receipt,
  BookOpen,
  Bell,
  Settings,
  School,
  BarChart3,
  Calendar,
  FileText,
  UserCheck,
  Home,
  BookOpenCheck,
  ClipboardList,
};

/**
 * Role display names and descriptions
 */
export const roleConfig: Record<UserRole, { label: string; description: string; emoji: string }> = {
  super_admin: {
    label: "Super Admin",
    description: "Platform-wide management",
    emoji: "⚙️",
  },
  school_admin: {
    label: "School Owner / Admin",
    description: "Manage your school operations",
    emoji: "🏫",
  },
  teacher: {
    label: "Teacher",
    description: "Attendance, assignments, results",
    emoji: "👩‍🏫",
  },
  parent: {
    label: "Parent",
    description: "Track your child's progress",
    emoji: "👨‍👩‍👧",
  },
  student: {
    label: "Student",
    description: "View assignments and results",
    emoji: "🎓",
  },
};

/**
 * Mobile bottom tab configuration per role
 */
export const mobileTabConfig: Record<UserRole, NavItem[]> = {
  super_admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { label: "Schools", href: "/dashboard/schools", icon: "School" },
    { label: "Users", href: "/dashboard/users", icon: "Users" },
    { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
  ],
  school_admin: [
    { label: "Home", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { label: "Students", href: "/dashboard/students", icon: "GraduationCap" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "ClipboardCheck" },
    { label: "Fees", href: "/dashboard/fees", icon: "Receipt" },
    { label: "More", href: "/dashboard/settings", icon: "Settings" },
  ],
  teacher: [
    { label: "Home", href: "/dashboard/teacher", icon: "LayoutDashboard" },
    { label: "Classes", href: "/dashboard/classes", icon: "Users" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "ClipboardCheck" },
    { label: "Assignments", href: "/dashboard/assignments", icon: "FileText" },
    { label: "More", href: "/dashboard/notifications", icon: "Bell" },
  ],
  parent: [
    { label: "Home", href: "/dashboard/parent", icon: "Home" },
    { label: "Children", href: "/dashboard/children", icon: "Users" },
    { label: "Fees", href: "/dashboard/fees", icon: "Receipt" },
    { label: "Academics", href: "/dashboard/academics", icon: "BookOpen" },
    { label: "Alerts", href: "/dashboard/notifications", icon: "Bell" },
  ],
  student: [
    { label: "Home", href: "/dashboard/student", icon: "Home" },
    { label: "Assignments", href: "/dashboard/assignments", icon: "BookOpenCheck" },
    { label: "Results", href: "/dashboard/results", icon: "ClipboardList" },
    { label: "Timetable", href: "/dashboard/timetable", icon: "Calendar" },
    { label: "Profile", href: "/dashboard/profile", icon: "UserCheck" },
  ],
};
