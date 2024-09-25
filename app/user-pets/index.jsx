import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { db } from "../../config/FirebaseConfig";
import { collection, query, where } from "firebase/firestore";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import PetCard from "../../components/Home/PetCard";
import Colors from "../../constants/Colors";
import { Alert } from "react-native";

export default function UserPets() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPetsList, setUserPetsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Pets",
    });
    user && GetUserPets();
  }, [user]);

  const GetUserPets = async () => {
    setLoading(true);
    const q = query(collection(db, "Pets"), where("ownerEmail", "==", user?.primaryEmailAddress.emailAddress));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserPetsList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  const OnDeletePet = (docId) => {
    Alert.alert("Delete the pet", "Do you really want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deletePet(docId),
      },
    ]);
  };

  const deletePet = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    setUserPetsList((prevPets) => prevPets.filter((pet) => pet.id !== docId));
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>UserPets</Text>
      <FlatList
        data={userPetsList}
        numColumns={2}
        refreshing={loading}
        onRefresh={GetUserPets}
        renderItem={({ item, index }) => (
          <View>
            <PetCard pet={item} key={index} />
            <Pressable onPress={() => OnDeletePet(item?.id)} style={styles.deleteButton}>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  textAlign: "center",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />

      {userPetsList.length === 0 && <Text style={{ fontFamily: "outfit-regular", fontSize: 20 }}>No pets found</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 5,
    borderRadius: 7,
    marginTop: 5,
    marginHorizontal: 20,
  },
});
