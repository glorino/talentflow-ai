import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  setToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <StatusBar style="auto" />
      <SignedIn>
        <RootLayoutNav />
      </SignedIn>
      <SignedOut>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>
      </SignedIn>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
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
    </Stack>
  );
}
