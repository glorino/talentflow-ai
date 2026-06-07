import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

const leaveTypes = [
  "Annual Leave",
  "Sick Leave",
  "Personal Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Bereavement",
  "Study Leave",
];

export default function LeaveRequestModal() {
  const router = useRouter();
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!leaveType || !startDate || !endDate) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    Alert.alert(
      "Leave Request Submitted",
      "Your leave request has been submitted for approval.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="mb-6 text-lg font-semibold text-gray-900">
          Leave Type
        </Text>
        <View className="mb-6 flex-row flex-wrap gap-2">
          {leaveTypes.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setLeaveType(type)}
              className={`rounded-full px-4 py-2 ${
                leaveType === type
                  ? "bg-blue-600"
                  : "border border-gray-300 bg-white"
              }`}
            >
              <Text
                className={`text-sm ${
                  leaveType === type ? "text-white" : "text-gray-700"
                }`}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="mb-2 text-sm font-medium text-gray-700">
          Start Date *
        </Text>
        <TextInput
          value={startDate}
          onChangeText={setStartDate}
          placeholder="YYYY-MM-DD"
          className="mb-4 rounded-lg border border-gray-300 bg-white p-3"
        />

        <Text className="mb-2 text-sm font-medium text-gray-700">
          End Date *
        </Text>
        <TextInput
          value={endDate}
          onChangeText={setEndDate}
          placeholder="YYYY-MM-DD"
          className="mb-4 rounded-lg border border-gray-300 bg-white p-3"
        />

        <Text className="mb-2 text-sm font-medium text-gray-700">Reason</Text>
        <TextInput
          value={reason}
          onChangeText={setReason}
          placeholder="Optional reason for leave"
          multiline
          numberOfLines={3}
          className="mb-6 rounded-lg border border-gray-300 bg-white p-3"
        />

        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3"
          >
            <Text className="text-center font-medium text-gray-700">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="flex-1 rounded-lg bg-blue-600 py-3"
          >
            <Text className="text-center font-medium text-white">
              Submit Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
