import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useOAuth, useAuth } from "@clerk/clerk-expo";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function LoginScreen() {
  const router = useRouter();
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isSignedIn } = useAuth();

  const onPress = React.useCallback(async () => {
    try {
      if (isSignedIn) {
        router.push("/home");
        return;
      }

      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: makeRedirectUri({
          path: "/(tabs)/home)",
        }),
      });

      if (createdSessionId) {
        console.log("Google ile oturum açma başarılı. Session ID:", createdSessionId);
        router.push("/home");
      } else {
        console.log("Oturum açılamadı. Session ID bulunamadı.");
      }
    } catch (err) {
      console.error("Oturum açma sırasında bir hata oluştu:", err);
    }
  }, [router, startOAuthFlow, isSignedIn]);

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Image source={require("../../assets/images/login.png")} style={{ width: "auto", height: 420 }} />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          They long for a family. Will you be the one?
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            textAlign: "center",
            marginTop: 10,
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          Choose the one who steals your heart and give them the life they deserve.
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            borderRadius: 14,
            marginTop: 100,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            Change a Life Today
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
