import { apiClient } from "./client";
import { useAuthStore } from "@/store/auth-store";
import type { AuthTokens } from "@/types";

export interface SchoolCreateResponse {
  school: any; // define proper type based on schema
  accessToken: string;
  refreshToken: string;
}

export const schoolApi = {
  createSchool: async (data: Record<string, any>): Promise<SchoolCreateResponse> => {
    const response = await apiClient.post("/school", data);
    
    // As per docs, creating a school returns new tokens with school_id baked in.
    // We automatically update the store and cookies here so subsequent requests use the new tokens.
    if (response.data.accessToken && response.data.refreshToken) {
      useAuthStore.getState().updateTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    }

    return response.data;
  },

  getSchool: async () => {
    const response = await apiClient.get("/school");
    return response.data;
  },

  updateSchool: async (data: Record<string, any>) => {
    const response = await apiClient.put("/school", data);
    return response.data;
  },

  inviteStaff: async (data: Record<string, any>) => {
    const response = await apiClient.post("/school/invite", data);
    return response.data;
  },

  getStaff: async () => {
    const response = await apiClient.get("/school/staff");
    return response.data;
  },
};
