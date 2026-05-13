import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole, AuthTokens, AuthState } from "@/types";

interface AuthStore extends AuthState {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setActiveRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;

  /**
   * Sign-in flow — for existing users only.
   * Sets hasCompletedSetup based on the backend response.
   */
  login: (user: User, tokens: AuthTokens, hasCompletedSetup?: boolean) => void;

  /**
   * Registration flow — for new users.
   * Always sets hasCompletedSetup to true because role + school are
   * collected during the registration form itself.
   */
  register: (
    user: User,
    tokens: AuthTokens,
    role: UserRole,
    schoolName?: string
  ) => void;

  /**
   * Post-registration onboarding (select-role page).
   * Only used if the register form does NOT collect role/school inline.
   */
  completeSetup: (role: UserRole, schoolName?: string) => void;

  logout: () => void;
}

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

      setUser: (user) => set({ user }),

      setTokens: (tokens) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", tokens.accessToken);
          localStorage.setItem("refresh_token", tokens.refreshToken);
        }
        set({ tokens });
      },

      setActiveRole: (role) => set({ activeRole: role }),

      setLoading: (isLoading) => set({ isLoading }),

      /* ──────────────────────────────────────────────
         LOGIN — existing users
         ────────────────────────────────────────────── */
      login: (user, tokens, hasCompletedSetup = true) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", tokens.accessToken);
          localStorage.setItem("refresh_token", tokens.refreshToken);
        }
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          activeRole: user.role,
          hasCompletedSetup,
        });
      },

      /* ──────────────────────────────────────────────
         REGISTER — new users (role collected in form)
         ────────────────────────────────────────────── */
      register: (user, tokens, role, schoolName) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", tokens.accessToken);
          localStorage.setItem("refresh_token", tokens.refreshToken);
        }
        set({
          user: { ...user, role },
          tokens,
          isAuthenticated: true,
          isLoading: false,
          activeRole: role,
          hasCompletedSetup: true,
          schoolName: schoolName || null,
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
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
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
