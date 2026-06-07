import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const notifications = [
  {
    id: "1",
    title: "Leave Request Approved",
    message: "Your annual leave request for Jun 10-14 has been approved.",
    time: "2 hours ago",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "Performance Review Due",
    message: "Q1 2026 self-assessment is due in 3 days.",
    time: "5 hours ago",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "Payroll Processed",
    message: "Your May 2026 payslip is now available.",
    time: "1 day ago",
    type: "info",
    read: true,
  },
  {
    id: "4",
    title: "Compliance Training",
    message: "Data Protection Training is due by Jun 30.",
    time: "2 days ago",
    type: "warning",
    read: true,
  },
  {
    id: "5",
    title: "New Course Available",
    message: "Advanced React Patterns course is now available.",
    time: "3 days ago",
    type: "info",
    read: true,
  },
];

const typeColors: Record<string, string> = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  error: "bg-red-500",
};

export default function NotificationsScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-2 pb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
          <TouchableOpacity>
            <Text className="text-blue-600">Mark all read</Text>
          </TouchableOpacity>
        </View>

        <View className="rounded-xl bg-white shadow-sm">
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              className={`border-b border-gray-100 p-4 ${
                !notification.read ? "bg-blue-50/50" : ""
              }`}
            >
              <View className="flex-row items-start gap-3">
                <View
                  className={`mt-1 h-2 w-2 rounded-full ${
                    typeColors[notification.type]
                  }`}
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text
                      className={`font-medium ${
                        !notification.read ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {notification.title}
                    </Text>
                    {!notification.read && (
                      <View className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </View>
                  <Text className="mt-1 text-sm text-gray-500">
                    {notification.message}
                  </Text>
                  <Text className="mt-1 text-xs text-gray-400">
                    {notification.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
