import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function UserItem({ userInfo }) {
  return (
    <Link href={"/chat?id=" + userInfo.docId}>
      <View>
        <View
          style={{
            marginVertical: 7,
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
            gap: 10,
          }}
        >
          <Image source={{ uri: userInfo?.imageUrl }} style={{ width: 50, height: 50, borderRadius: 100 }} />
          <Text>{userInfo?.name}</Text>
        </View>
      </View>
      <View style={{ borderWidth: 0.2, marginVertical: 7, borderColor: Colors.GRAY }}></View>
    </Link>
  );
}
