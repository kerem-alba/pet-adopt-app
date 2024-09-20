import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <PetSubInfoCard icon={"https://img.icons8.com/?size=100&id=15643&format=png&color=000000"} title="Age" value={pet?.age} />
        <PetSubInfoCard icon={"https://img.icons8.com/?size=100&id=rMFBzyoCXhQ4&format=png&color=000000"} title="Breed" value={pet?.breed} />
      </View>
    </View>
  );
}
