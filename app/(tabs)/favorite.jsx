import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "../../shared/Shared";
import { useUser } from "@clerk/clerk-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetCard from "../../components/Home/PetCard";

export default function Favorite() {
  const { user } = useUser();
  const [favPetIds, setfavPetIds] = useState([]);
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  const GetFavPetIds = async () => {
    setLoading(true);
    const result = await Shared.GetFavList(user);
    setfavPetIds(result?.favorites);
    GetFavPetList(result?.favorites);
    setLoading(false);
  };

  const GetFavPetList = async (favId) => {
    setLoading(true);
    setFavList([]);

    if (!favId || favId.length === 0) {
      console.warn("Favorites list is empty or undefined.");
      setFavList([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "Pets"), where("id", "in", favId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFavList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        Favorites
      </Text>
      <FlatList
        data={favList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <View>
            <PetCard pet={item} />
          </View>
        )}
      />
    </View>
  );
}
