import { View, Text, Button } from "react-native";
import React from "react";
import { addMultiplePetsToFirestore } from "../../services/firebaseService";
import { fetchPets } from "../../services/firebaseService";
import { updatePetsWithNewData } from "../../services/firebaseService";

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
