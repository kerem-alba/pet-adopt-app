import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import React from "react";

export default function RootLayout() {
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await AsyncStorage.getItem(key);
        return item;
      } catch (error) {
        console.error("AsyncStorage get item error: ", error);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return AsyncStorage.setItem(key, value);
      } catch (err) {
        console.error("AsyncStorage set item error:", err);
        return;
      }
    },
  };

  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY ?? "";

  const [fontsLoaded] = useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <AuthenticationWrapper>
          <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
          </Stack>
        </AuthenticationWrapper>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function AuthenticationWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    } else if (isLoaded && isSignedIn) {
      router.push("/home");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return <>{children}</>;
}
