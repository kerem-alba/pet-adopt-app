import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { query } from "firebase/firestore";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import UserItem from "../../components/Inbox/UserItem";

export default function inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    const q = query(collection(db, "Chat"), where("userIds", "array-contains", user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert("No chats found");
      return;
    }
    querySnapshot.forEach((doc) => {
      setUserList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((item) => {
      const otherUser = item.users.filter((u) => u.email !== user?.primaryEmailAddress?.emailAddress);
      const result = {
        docId: item.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
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
        Inbox
      </Text>

      <FlatList
        style={{ marginTop: 20 }}
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={() => GetUserList()}
        renderItem={({ item, index }) => <UserItem userInfo={item} key={index} />}
      />
    </View>
  );
}
