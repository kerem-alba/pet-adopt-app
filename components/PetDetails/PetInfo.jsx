import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import MarkFav from "../MarkFav";

export default function PetInfo({ pet }) {
  const fixedUrl = pet.imageUrl.replace(/\/pet-adopt-app\//, "/pet-adopt-app%2F");

  return (
    <View>
      <Image
        source={{ uri: fixedUrl }}
        style={{
          width: "100%",
          height: 400,
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
            }}
          >
            {pet?.name}
          </Text>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 16,
              color: Colors.GRAY,
            }}
          >
            {pet?.address}
          </Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
}
