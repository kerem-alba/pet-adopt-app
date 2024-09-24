import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { useNavigation } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment/moment";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();
    const unsubscribe = onSnapshot(collection(db, "Chat", params?.id, "Messages"), (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });
    return () => unsubscribe();
  }, []);

  const onSend = async (newMessage) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
    newMessage[0].createdAt = moment().format();
    await addDoc(collection(db, "Chat", params.id, "Messages"), newMessage[0]);
  };

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", params?.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    }

    const result = docSnap.data();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const otherUser = result.users.filter((item) => item.email !== userEmail);
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
