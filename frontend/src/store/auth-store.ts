import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole, AuthTokens, AuthState } from "@/types";

interface AuthStore extends AuthState {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  setActiveRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, tokens: AuthTokens) => void;
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

      login: (user, tokens) => {
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
        });
      },

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
      }),
    }
  )
);
