import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, Pressable, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "expo-router";

export default function AddNewPet() {
  const navigation = useNavigation();
  const storage = getStorage();
  const { user } = useUser();
  const router = useRouter();

  const [gender, setGender] = useState();
  const [formData, setFormData] = useState({ category: "Dogs", gender: "Male" });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Add New Pet",
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onSubmit = async () => {
    if (Object.values(formData).some((value) => !value) || !image) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.BOTTOM);
      return;
    }
    UploadImage();
  };

  const UploadImage = async () => {
    setLoader(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, "/pet-adopt-app/pet-adopt-app" + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
      })
      .then((response) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          SaveFormData(downloadUrl);
        });
      });
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      ownerName: user?.fullName,
      ownerEmail: user?.primaryEmailAddress?.emailAddress,
      ownerImageUrl: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        Add New Pet for Adoption
      </Text>
      <Pressable onPress={pickImage}>
        {!image ? (
          <Image source={{ uri: "https://img.icons8.com/?size=100&id=121204&format=png&color=000000" }} style={style.image} />
        ) : (
          <Image source={{ uri: image }} style={style.image} />
        )}
      </Pressable>

      <View style={style.inputContainer}>
        <Text style={style.label}>Pet Name *</Text>
        <TextInput style={style.input} onChangeText={(value) => handleInputChange("name", value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>Pet Category *</Text>
        <Picker
          style={style.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>Breed *</Text>
        <TextInput style={style.input} onChangeText={(value) => handleInputChange("breed", value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>Age *</Text>
        <TextInput style={style.input} keyboardType="numeric" onChangeText={(value) => handleInputChange("age", value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>Weight *</Text>
        <TextInput style={style.input} keyboardType="numeric" onChangeText={(value) => handleInputChange("weight", value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>Sex *</Text>
        <Picker
          style={style.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>Address *</Text>
        <TextInput style={style.input} onChangeText={(value) => handleInputChange("address", value)} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>About *</Text>
        <TextInput style={style.input} numberOfLines={5} multiline={true} onChangeText={(value) => handleInputChange("about", value)} />
      </View>

      <TouchableOpacity style={style.button} disabled={loader} onPress={onSubmit}>
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text style={{ color: Colors.WHITE, textAlign: "center", fontFamily: "outfit-medium" }}>Add Pet</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit-regular",
  },
  label: {
    fontFamily: "outfit-regular",
    marginVertical: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 25,
  },
  image: {
    width: 160,
    height: 160,
    padding: 20,
    marginVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
});
