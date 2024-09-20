import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "@/components/Home/PetListByCategory";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

export default function Home() {
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Header />
      <Slider />
      <PetListByCategory />

      <TouchableOpacity style={styles.addNewPetContainer}>
        <Ionicons name="paw" size={24} color={Colors.SECONDARY} />
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: Colors.SECONDARY,
            fontSize: 18,
          }}
        >
          Add New Pet
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_SECONDARY,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "dashed",
    justifyContent: "center",
  },
});
