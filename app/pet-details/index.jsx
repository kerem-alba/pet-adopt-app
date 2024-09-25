import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const initiateChat = async () => {
    if (!user || !pet?.ownerEmail) {
      console.log("User or owner email is not available");
      return;
    }

    const docId1 = user.primaryEmailAddress.emailAddress + "_" + pet.ownerEmail;
    const docId2 = pet.ownerEmail + "_" + user.primaryEmailAddress.emailAddress;

    const q = query(collection(db, "Chat"), where("id", "==", docId1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await setDoc(doc(db, "Chat", docId1 || docId2), {
        id: docId1,
        users: [
          { email: user.primaryEmailAddress.emailAddress, imageUrl: user.imageUrl, name: user.fullName },
          { email: pet.ownerEmail, imageUrl: pet.ownerImageUrl, name: pet.ownerName },
        ],
        userIds: [user.primaryEmailAddress.emailAddress, pet.ownerEmail],
      });
      console.log("New chat created:", docId1);
      router.push({
        pathname: "/chat",
        params: { id: docId1 },
      });
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        router.push({
          pathname: "/chat",
          params: { id: doc.id },
        });
      });
    }
  };

  return (
    <View>
      <ScrollView>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: 100 }}></View>

        <View style={styles?.bottomContainer}>
          <TouchableOpacity
            onPress={initiateChat}
            disabled={pet?.ownerEmail === user?.primaryEmailAddress?.emailAddress}
            style={[
              styles?.adoptBtn,
              pet?.ownerEmail === user?.primaryEmailAddress?.emailAddress && { backgroundColor: "gray" }, // Butonun stilini gri yapıyoruz
            ]}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              Adopt Me
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    alignItems: "center",
  },
  bottomContainer: {
    position: "fixed",
    width: "100%",
    bottom: 0,
  },
});
