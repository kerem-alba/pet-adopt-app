import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PetCard({ pet }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={{
        padding: 10,
        marginRight: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <Image source={{ uri: pet?.imageUrl }} style={{ width: 150, height: 135, borderRadius: 10 }} />
      <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>{pet.name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.GRAY,
            fontFamily: "outfit-regular",
          }}
        >
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: Colors.SECONDARY,
            paddingHorizontal: 7,
            borderRadius: 10,
            backgroundColor: Colors.LIGHT_SECONDARY,
            fontSize: 11,
          }}
        >
          {pet.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
}
