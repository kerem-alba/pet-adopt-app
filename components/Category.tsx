import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import Colors from "../constants/Colors";

export default function Category() {
  const [categoryList, setCategoryList] = useState<DocumentData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>Category</Text>
      <FlatList
        data={categoryList}
        numColumns={5}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item.name)} style={{ flex: 1 }}>
            <View style={[styles.container, selectedCategory == item.name && styles.selectedCategoryContainer]}>
              <Image source={{ uri: item?.imageUrl }} style={{ width: 40, height: 40 }} />
            </View>
            <Text style={{ textAlign: "center" }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});
