import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("tf_token").then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="(modals)/leave-request"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Request Leave",
              }}
            />
            <Stack.Screen
              name="(modals)/clock-in"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Clock In/Out",
              }}
            />
            <Stack.Screen
              name="(modals)/expense-report"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Submit Expense",
              }}
            />
          </>
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </>
  );
}
