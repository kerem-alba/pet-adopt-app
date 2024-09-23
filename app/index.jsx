import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();
  return <View>{user ? <Link href={"/(tabs)/home"} /> : <Link href={"/login"} />}</View>;
}
