import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const leaveBalance = [
  { type: "Annual Leave", total: 20, used: 5, remaining: 15, color: "#2563eb" },
  { type: "Sick Leave", total: 10, used: 2, remaining: 8, color: "#059669" },
  { type: "Personal Leave", total: 5, used: 1, remaining: 4, color: "#7c3aed" },
];

const leaveHistory = [
  {
    type: "Annual Leave",
    dates: "Jun 10 - Jun 14, 2026",
    days: 5,
    status: "approved",
  },
  {
    type: "Sick Leave",
    dates: "May 20, 2026",
    days: 1,
    status: "approved",
  },
  {
    type: "Annual Leave",
    dates: "Jul 21 - Jul 25, 2026",
    days: 5,
    status: "pending",
  },
];

const statusColors: Record<string, string> = {
  approved: "text-green-600 bg-green-50",
  pending: "text-yellow-600 bg-yellow-50",
  rejected: "text-red-600 bg-red-50",
};

export default function LeaveScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-2 pb-6">
        <Text className="mb-4 text-2xl font-bold text-gray-900">
          My Leave
        </Text>

        <View className="mb-6 flex-row flex-wrap justify-between">
          {leaveBalance.map((leave) => (
            <View
              key={leave.type}
              className="mb-3 w-full rounded-xl bg-white p-4 shadow-sm"
            >
              <View className="flex-row items-center justify-between">
                <Text className="font-semibold text-gray-900">{leave.type}</Text>
                <Text className="text-2xl font-bold" style={{ color: leave.color }}>
                  {leave.remaining}
                </Text>
              </View>
              <View className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${(leave.used / leave.total) * 100}%`,
                    backgroundColor: leave.color,
                  }}
                />
              </View>
              <Text className="mt-1 text-sm text-gray-500">
                {leave.used} used of {leave.total} days
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => router.push("(modals)/leave-request")}
          className="mb-6 rounded-xl bg-blue-600 p-4"
        >
          <Text className="text-center font-semibold text-white">
            Request Leave
          </Text>
        </TouchableOpacity>

        <Text className="mb-3 text-lg font-semibold text-gray-900">
          Leave History
        </Text>
        <View className="rounded-xl bg-white shadow-sm">
          {leaveHistory.map((leave, index) => (
            <View
              key={index}
              className="border-b border-gray-100 p-4"
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-medium text-gray-900">{leave.type}</Text>
                  <Text className="text-sm text-gray-500">{leave.dates}</Text>
                  <Text className="text-sm text-gray-500">
                    {leave.days} day{leave.days > 1 ? "s" : ""}
                  </Text>
                </View>
                <View
                  className={`rounded-full px-3 py-1 ${
                    statusColors[leave.status]
                  }`}
                >
                  <Text className="text-xs font-medium capitalize">
                    {leave.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
