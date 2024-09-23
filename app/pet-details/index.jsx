import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";
import PetInfo from "../../components/PetDetails/PetInfo";
import PetSubInfo from "../../components/PetDetails/PetSubInfo";
import AboutPet from "../../components/PetDetails/AboutPet";
import OwnerInfo from "../../components/PetDetails/OwnerInfo";
import Colors from "../../constants/Colors";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);
  return (
    <View>
      <ScrollView>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: 100 }}></View>

        <View style={styles?.bottomContainer}>
          <TouchableOpacity style={styles?.adoptBtn}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {" "}
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
