import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Clock,
  Calendar,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Wallet,
  GraduationCap,
} from "lucide-react";

const API_BASE = process.env.EXPO_PUBLIC_API_URL || "https://web-glopresc.vercel.app";

const stats = [
  { label: "Hours Today", value: "7.5h", icon: Clock, color: "#2563eb" },
  { label: "Leave Balance", value: "15 days", icon: Calendar, color: "#059669" },
  { label: "Performance", value: "4.2/5", icon: TrendingUp, color: "#7c3aed" },
  { label: "Pending Tasks", value: "3", icon: AlertCircle, color: "#dc2626" },
];

const quickActions = [
  { label: "Clock In", icon: Clock, color: "#2563eb", route: "(modals)/clock-in" },
  { label: "Request Leave", icon: Calendar, color: "#059669", route: "(modals)/leave-request" },
  { label: "View Payslip", icon: Wallet, color: "#7c3aed", route: "/payslips" },
  { label: "My Learning", icon: GraduationCap, color: "#ea580c", route: "/learning" },
];

const recentActivity = [
  { title: "Clock in recorded", time: "9:00 AM", type: "attendance" },
  { title: "Leave approved", time: "Yesterday", type: "leave" },
  { title: "Performance review completed", time: "2 days ago", type: "performance" },
  { title: "New course enrolled", time: "3 days ago", type: "learning" },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const token = await SecureStore.getItemAsync("tf_token");
      if (!token) return;
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUserName(`${data.data.user.firstName}`);
      }
    } catch {}
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUser();
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="px-4 pt-2 pb-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Welcome back, {userName}
          </Text>
          <Text className="text-gray-500">
            Here&apos;s your HR overview
          </Text>
        </View>

        <View className="mb-6 flex-row flex-wrap justify-between">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <View
                key={stat.label}
                className="mb-3 w-[48%] rounded-xl bg-white p-4 shadow-sm"
              >
                <View
                  className="mb-2 h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon size={20} color={stat.color} />
                </View>
                <Text className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </Text>
                <Text className="text-sm text-gray-500">{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <Text className="mb-3 text-lg font-semibold text-gray-900">
          Quick Actions
        </Text>
        <View className="mb-6 flex-row flex-wrap justify-between">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.label}
                onPress={() => router.push(action.route as any)}
                className="mb-3 w-[48%] rounded-xl bg-white p-4 shadow-sm"
              >
                <View
                  className="mb-2 h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <Icon size={20} color={action.color} />
                </View>
                <Text className="font-medium text-gray-900">
                  {action.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="mb-3 text-lg font-semibold text-gray-900">
          Recent Activity
        </Text>
        <View className="rounded-xl bg-white shadow-sm">
          {recentActivity.map((activity, index) => (
            <TouchableOpacity
              key={index}
              className="flex items-center justify-between border-b border-gray-100 px-4 py-3"
            >
              <View>
                <Text className="font-medium text-gray-900">
                  {activity.title}
                </Text>
                <Text className="text-sm text-gray-500">{activity.time}</Text>
              </View>
              <ChevronRight size={16} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="mt-4 rounded-xl bg-blue-600 p-4">
          <Text className="text-center font-semibold text-white">
            AI Assistant
          </Text>
          <Text className="text-center text-sm text-blue-100">
            Ask me anything about HR policies
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
