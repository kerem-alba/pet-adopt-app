import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Profile() {
  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 5,
      name: "My Pets",
      icon: "paw",
      path: "./../user-pets",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];

  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const onPressMenu = (menu) => {
    if (menu.name == "Logout") {
      signOut();
      return;
    }
    router.push(menu.path);
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
        Profile
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginVertical: 25,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          {user?.fullName}
        </Text>
        <Text style={{ fontFamily: "outfit-regular", fontSize: 16, color: Colors.GRAY }}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={item.id}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons
              name={item?.icon}
              size={35}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: Colors.LIGHT_SECONDARY,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 20,
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
