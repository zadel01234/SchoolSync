import { apiClient } from "./client";
import type { User, AuthTokens } from "@/types";

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  register: async (data: Record<string, any>): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  login: async (data: Record<string, any>): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Attempt to inform backend. The store handles local token clearing regardless.
    await apiClient.post("/auth/logout");
  },

  setup2fa: async () => {
    const response = await apiClient.post("/auth/2fa/setup");
    return response.data;
  },

  verify2fa: async (data: { token: string }) => {
    const response = await apiClient.post("/auth/2fa/verify", data);
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await apiClient.post("/auth/forgot-password", data);
    return response.data;
  },

  resetPassword: async (data: Record<string, any>) => {
    const response = await apiClient.post("/auth/reset-password", data);
    return response.data;
  },
};
