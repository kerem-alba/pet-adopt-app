import { View, Text, Button } from "react-native";
import React from "react";
import { addMultiplePetsToFirestore } from "../../services/firebaseService";

export default function admin() {
  const handleAddData = () => {
    addMultiplePetsToFirestore();
  };
  return (
    <View style={{ padding: 50, paddingTop: 100 }}>
      <Button title="Verileri Firestore'a Ekle" onPress={handleAddData} />
    </View>
  );
}
