import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, DocumentData, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetCard from "./PetCard";

export default function PetListByCategory() {
  const [petsList, setPetsList] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    GetPetList("Dogs");
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    setPetsList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setPetsList((petsList) => [...petsList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petsList}
        style={{ marginTop: 10 }}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList("Dogs")}
        renderItem={({ item }) => <PetCard pet={item} />}
      />
    </View>
  );
}
