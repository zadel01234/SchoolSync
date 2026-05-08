import React, { createContext, useContext, useState, useCallback } from "react";
import { useColorScheme } from "react-native";
import { colors } from "./tokens";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: typeof lightTheme;
}

const lightTheme = {
  background: "#ffffff",
  foreground: colors.slate[900],
  card: "#ffffff",
  cardForeground: colors.slate[900],
  primary: colors.primary[600],
  primaryForeground: "#ffffff",
  secondary: colors.slate[100],
  secondaryForeground: colors.slate[900],
  muted: colors.slate[100],
  mutedForeground: colors.slate[500],
  accent: colors.primary[50],
  border: colors.slate[200],
  destructive: colors.danger[500],
  success: colors.success[500],
  warning: colors.warning[500],
};

const darkTheme = {
  background: colors.slate[950],
  foreground: colors.slate[50],
  card: colors.slate[900],
  cardForeground: colors.slate[50],
  primary: colors.primary[500],
  primaryForeground: "#ffffff",
  secondary: colors.slate[800],
  secondaryForeground: colors.slate[50],
  muted: colors.slate[800],
  mutedForeground: colors.slate[400],
  accent: colors.primary[900],
  border: colors.slate[700],
  destructive: colors.danger[500],
  success: colors.success[500],
  warning: colors.warning[500],
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
