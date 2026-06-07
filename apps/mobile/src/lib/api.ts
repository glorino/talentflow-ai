import * as SecureStore from "expo-secure-store";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.talentflow.ai";

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getAuthToken(): Promise<string | null> {
    return SecureStore.getItemAsync("clerk_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<{ success: boolean; data?: T; error?: { code: string; message: string } }> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: options.method || "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: "API_ERROR",
            message: data.error?.message || "Request failed",
          },
        };
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: error instanceof Error ? error.message : "Network error",
        },
      };
    }
  }

  async get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: "POST", body });
  }

  async put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: "PUT", body });
  }

  async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // Employee endpoints
  async getEmployees(params?: { departmentId?: string; status?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.get(`/api/employees${query ? `?${query}` : ""}`);
  }

  async getEmployee(id: string) {
    return this.get(`/api/employees/${id}`);
  }

  // Leave endpoints
  async getLeaveRequests(employeeId: string) {
    return this.get(`/api/leave?employeeId=${employeeId}`);
  }

  async requestLeave(data: {
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
  }) {
    return this.post("/api/leave", data);
  }

  // Attendance endpoints
  async clockIn(data: { location?: string; isRemote: boolean }) {
    return this.post("/api/attendance/clock-in", data);
  }

  async clockOut() {
    return this.post("/api/attendance/clock-out", {});
  }

  async getAttendance(employeeId: string, date?: string) {
    return this.get(
      `/api/attendance?employeeId=${employeeId}${date ? `&date=${date}` : ""}`
    );
  }

  // Payroll endpoints
  async getPayslips(employeeId: string) {
    return this.get(`/api/payroll?employeeId=${employeeId}`);
  }

  // AI endpoints
  async executeAgent(agent: string, action: string, input: unknown) {
    return this.post("/api/ai", { agent, action, input });
  }

  async executeWorkflow(workflowId: string, input: unknown) {
    return this.post(`/api/ai/workflows/${workflowId}`, { input });
  }

  // Notification endpoints
  async getNotifications(userId: string) {
    return this.get(`/api/notifications?userId=${userId}`);
  }

  async markNotificationRead(notificationId: string) {
    return this.put(`/api/notifications/${notificationId}`, { isRead: true });
  }
}

export const api = new ApiClient(API_BASE_URL);
