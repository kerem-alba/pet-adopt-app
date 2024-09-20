import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Colors from "../../constants/Colors";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  useEffect(() => {
    GetCategories();
  }, []);

  const predefinedOrder = ["Dogs", "Cats", "Birds", "Fishes", "Reptiles"];

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    let categories = [];
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    categories = categories.sort((a, b) => predefinedOrder.indexOf(a.name) - predefinedOrder.indexOf(b.name));
    setCategoryList(categories);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>Category</Text>
      <FlatList
        data={categoryList}
        numColumns={5}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name);
            }}
            style={{ flex: 1 }}
          >
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
    backgroundColor: Colors.LIGHT_SECONDARY,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});
