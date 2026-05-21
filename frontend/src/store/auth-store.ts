import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import type { User, UserRole, AuthTokens, AuthState } from "@/types";

interface AuthStore extends AuthState {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setActiveRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  updateTokens: (tokens: AuthTokens) => void;

  /**
   * Sign-in flow — for existing users only.
   * Sets hasCompletedSetup based on the backend response.
   */
  login: (user: User, tokens: AuthTokens, hasCompletedSetup?: boolean) => void;

  /**
   * Registration flow — for new users.
   * Sets hasCompletedSetup to false so they proceed to the select-role page.
   */
  register: (
    user: User,
    tokens: AuthTokens
  ) => void;

  /**
   * Post-registration onboarding (select-role page).
   * Only used if the register form does NOT collect role/school inline.
   */
  completeSetup: (role: UserRole, schoolName?: string) => void;

  logout: () => void;
}

const normalizeUser = (user: any): User => {
  if (!user) return user;
  let firstName = user.firstName || "";
  let lastName = user.lastName || "";
  if (user.full_name && (!firstName || !lastName)) {
    const parts = user.full_name.trim().split(/\s+/);
    firstName = parts[0] || "";
    lastName = parts.slice(1).join(" ") || "";
  }
  return {
    ...user,
    firstName,
    lastName,
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,
      activeRole: null,
      hasCompletedSetup: false,
      schoolName: null,

      setUser: (user) => set({ user: normalizeUser(user) }),

      setTokens: (tokens) => {
        if (typeof window !== "undefined") {
          Cookies.set("access_token", tokens.accessToken, { path: "/", secure: process.env.NODE_ENV === "production", sameSite: "lax" });
          Cookies.set("refresh_token", tokens.refreshToken, { path: "/", expires: 7, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
        }
        set({ tokens });
      },

      updateTokens: (tokens) => {
        if (typeof window !== "undefined") {
          Cookies.set("access_token", tokens.accessToken, { path: "/", secure: process.env.NODE_ENV === "production", sameSite: "lax" });
          Cookies.set("refresh_token", tokens.refreshToken, { path: "/", expires: 7, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
        }
        set({ tokens });
      },

      setActiveRole: (role) => set({ activeRole: role }),

      setLoading: (isLoading) => set({ isLoading }),

      /* ──────────────────────────────────────────────
         LOGIN — existing users
         ────────────────────────────────────────────── */
      login: (user, tokens, hasCompletedSetup = true) => {
        const normalized = normalizeUser(user);
        if (typeof window !== "undefined") {
          Cookies.set("access_token", tokens.accessToken, { path: "/", secure: process.env.NODE_ENV === "production", sameSite: "lax" });
          Cookies.set("refresh_token", tokens.refreshToken, { path: "/", expires: 7, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
        }
        set({
          user: normalized,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          activeRole: normalized.role,
          hasCompletedSetup,
        });
      },

      /* ──────────────────────────────────────────────
         REGISTER — new users
         ────────────────────────────────────────────── */
      register: (user, tokens) => {
        const normalized = normalizeUser(user);
        if (typeof window !== "undefined") {
          Cookies.set("access_token", tokens.accessToken, { path: "/", secure: process.env.NODE_ENV === "production", sameSite: "lax" });
          Cookies.set("refresh_token", tokens.refreshToken, { path: "/", expires: 7, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
        }
        set({
          user: normalized,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          activeRole: normalized.role,
          hasCompletedSetup: false,
          schoolName: null,
        });
      },

      /* ──────────────────────────────────────────────
         COMPLETE SETUP — legacy / select-role flow
         ────────────────────────────────────────────── */
      completeSetup: (role, schoolName) =>
        set({
          activeRole: role,
          hasCompletedSetup: true,
          schoolName: schoolName || null,
        }),

      /* ──────────────────────────────────────────────
         LOGOUT
         ────────────────────────────────────────────── */
      logout: () => {
        if (typeof window !== "undefined") {
          Cookies.remove("access_token", { path: "/" });
          Cookies.remove("refresh_token", { path: "/" });
        }
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
          activeRole: null,
          hasCompletedSetup: false,
          schoolName: null,
        });
      },
    }),
    {
      name: "schoolsync-auth",
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
        activeRole: state.activeRole,
        hasCompletedSetup: state.hasCompletedSetup,
        schoolName: state.schoolName,
      }),
    }
  )
);
