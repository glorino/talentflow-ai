import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

export default function ClockInOutModal() {
  const router = useRouter();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [clockInTime, setClockInTime] = useState<Date | null>(null);

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

  const handleToggle = () => {
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
    <View className="flex-1 items-center justify-center bg-gray-50 px-6">
      <View className="mb-8 h-48 w-48 items-center justify-center rounded-full bg-white shadow-lg">
        <Text className="text-5xl font-bold text-gray-900">{elapsedTime}</Text>
        <Text className="text-gray-500">
          {isClockedIn ? "Working" : "Ready to start"}
        </Text>
      </View>

      {isClockedIn && clockInTime && (
        <Text className="mb-6 text-gray-500">
          Started at{" "}
          {clockInTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleToggle}
        className={`mb-6 rounded-full px-16 py-6 ${
          isClockedIn ? "bg-red-500" : "bg-green-500"
        }`}
      >
        <Text className="text-2xl font-bold text-white">
          {isClockedIn ? "Clock Out" : "Clock In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-blue-600">Close</Text>
      </TouchableOpacity>
    </View>
  );
}
