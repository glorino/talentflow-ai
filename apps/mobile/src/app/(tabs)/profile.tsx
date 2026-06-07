import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  User,
  Mail,
  Phone,
  Building2,
  CreditCard,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "My Profile", icon: User, route: "/profile" },
  { label: "Documents", icon: CreditCard, route: "/documents" },
  { label: "Settings", icon: Settings, route: "/settings" },
];

export default function ProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="items-center bg-white px-4 py-8">
        <View className="mb-3 h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Text className="text-2xl font-bold text-blue-600">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </Text>
        </View>
        <Text className="text-xl font-bold text-gray-900">
          {user?.firstName} {user?.lastName}
        </Text>
        <Text className="text-gray-500">Senior Software Engineer</Text>
        <Text className="text-sm text-gray-400">EMP-0002</Text>
      </View>

      <View className="px-4 py-4">
        <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center gap-3 border-b border-gray-100 py-3">
            <Mail size={18} color="#6b7280" />
            <Text className="flex-1 text-gray-700">
              {user?.emailAddresses?.[0]?.emailAddress}
            </Text>
          </View>
          <View className="flex-row items-center gap-3 border-b border-gray-100 py-3">
            <Phone size={18} color="#6b7280" />
            <Text className="flex-1 text-gray-700">+1 (555) 123-4567</Text>
          </View>
          <View className="flex-row items-center gap-3 py-3">
            <Building2 size={18} color="#6b7280" />
            <Text className="flex-1 text-gray-700">Engineering Department</Text>
          </View>
        </View>

        <View className="mb-4 rounded-xl bg-white shadow-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.label}
                className="flex-row items-center gap-3 border-b border-gray-100 px-4 py-3"
              >
                <Icon size={18} color="#6b7280" />
                <Text className="flex-1 text-gray-900">{item.label}</Text>
                <ChevronRight size={16} color="#9ca3af" />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity className="flex-row items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
          <LogOut size={18} color="#dc2626" />
          <Text className="text-red-600">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
