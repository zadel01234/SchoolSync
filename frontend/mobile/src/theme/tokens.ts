/**
 * SchoolSync Mobile Design Tokens
 * Mirrors the web design system for consistency
 */

export const colors = {
  primary: {
    50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc",
    400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca",
    800: "#3730a3", 900: "#312e81",
  },
  success: {
    50: "#ecfdf5", 100: "#d1fae5", 500: "#10b981", 600: "#059669", 700: "#047857",
  },
  warning: {
    50: "#fffbeb", 100: "#fef3c7", 500: "#f59e0b", 600: "#d97706",
  },
  danger: {
    50: "#fef2f2", 100: "#fee2e2", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c",
  },
  slate: {
    50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
    400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
    800: "#1e293b", 900: "#0f172a", 950: "#020617",
  },
} as const;

export const typography = {
  fontSize: {
    xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, "4xl": 36,
  },
  fontWeight: {
    light: "300" as const, regular: "400" as const, medium: "500" as const,
    semibold: "600" as const, bold: "700" as const, extrabold: "800" as const,
  },
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, "2xl": 32, "3xl": 40, "4xl": 48,
} as const;

export const radius = {
  sm: 6, base: 8, md: 10, lg: 12, xl: 16, "2xl": 20, full: 9999,
} as const;

export const shadows = {
  sm: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  md: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  lg: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
} as const;
