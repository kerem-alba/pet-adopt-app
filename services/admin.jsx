import { View, Text, Button } from "react-native";
import React from "react";
import { addMultiplePetsToFirestore } from "./firebaseService";
import { fetchPets } from "./firebaseService";
import { updatePetsWithNewData } from "./firebaseService";

export default function admin() {
  const handleAddData = () => {
    addMultiplePetsToFirestore();
  };

  const handleFetchData = () => {
    fetchPets();
  };

  const handleUpdateData = () => {
    updatePetsWithNewData();
  };
  return (
    <View style={{ padding: 50, paddingTop: 100 }}>
      <Button title="Verileri Firestore'a Ekle" onPress={handleAddData} />
      <Button title="Verileri Getir" onPress={handleFetchData} />
      <Button title="Verileri Güncelle" onPress={handleUpdateData} />
    </View>
  );
}
