import { create } from "zustand";

interface UserState {
  companyId: string | null;
  userId: string | null;
  role: string | null;
  employeeId: string | null;
  setCompany: (companyId: string) => void;
  setUser: (userId: string, role: string, employeeId?: string) => void;
  clear: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  companyId: null,
  userId: null,
  role: null,
  employeeId: null,
  setCompany: (companyId) => set({ companyId }),
  setUser: (userId, role, employeeId) => set({ userId, role, employeeId }),
  clear: () =>
    set({ companyId: null, userId: null, role: null, employeeId: null }),
}));

interface AttendanceState {
  isClockedIn: boolean;
  clockInTime: Date | null;
  clockIn: () => void;
  clockOut: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  isClockedIn: false,
  clockInTime: null,
  clockIn: () => set({ isClockedIn: true, clockInTime: new Date() }),
  clockOut: () => set({ isClockedIn: false, clockInTime: null }),
}));

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  decrementUnread: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  decrementUnread: () =>
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
}));
