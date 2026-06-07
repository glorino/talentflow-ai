import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function AttendanceScreen() {
  const { user } = useUser();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockedIn && clockInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - clockInTime.getTime();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setElapsedTime(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, clockInTime]);

  const handleClockToggle = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      setClockInTime(null);
      setElapsedTime("00:00:00");
    } else {
      setIsClockedIn(true);
      setClockInTime(new Date());
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="items-center px-6 pt-12">
        <View className="mb-8 h-40 w-40 items-center justify-center rounded-full bg-white shadow-lg">
          <Text className="text-4xl font-bold text-gray-900">
            {elapsedTime}
          </Text>
          <Text className="text-gray-500">
            {isClockedIn ? "Working" : "Not started"}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleClockToggle}
          className={`mb-8 rounded-full px-12 py-5 ${
            isClockedIn ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <Text className="text-xl font-bold text-white">
            {isClockedIn ? "Clock Out" : "Clock In"}
          </Text>
        </TouchableOpacity>

        {isClockedIn && clockInTime && (
          <View className="w-full rounded-xl bg-white p-4 shadow-sm">
            <Text className="mb-2 text-center font-medium text-gray-900">
              Today&apos;s Summary
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Clock In</Text>
              <Text className="font-medium text-gray-900">
                {clockInTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Status</Text>
              <Text className="font-medium text-green-600">Present</Text>
            </View>
          </View>
        )}

        <View className="mt-6 w-full">
          <Text className="mb-3 text-lg font-semibold text-gray-900">
            This Week
          </Text>
          <View className="rounded-xl bg-white p-4 shadow-sm">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <View
                key={day}
                className="flex-row items-center justify-between border-b border-gray-100 py-2"
              >
                <Text className="w-12 text-gray-500">{day}</Text>
                <Text className="text-gray-900">
                  {index < 4 ? "9:00 AM - 6:00 PM" : index === 4 && isClockedIn ? "In Progress" : "--"}
                </Text>
                <View
                  className={`h-2 w-2 rounded-full ${
                    index < 4 ? "bg-green-500" : index === 4 && isClockedIn ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
