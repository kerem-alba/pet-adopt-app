import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OwnerInfo({ pet }) {
  console.log("pet", pet);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",

          gap: 20,
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
          }}
          source={{ uri: pet.ownerImageUrl }}
        />
        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
            }}
          >
            {pet?.ownerName}
          </Text>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 15,
              color: Colors.GRAY,
            }}
          >
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send-outline" size={24} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
  },
});
