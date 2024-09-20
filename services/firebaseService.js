import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const pets = [];

export const addMultiplePetsToFirestore = async () => {
  try {
    for (const pet of pets) {
      const docRef = await addDoc(collection(db, "Pets"), pet);
      console.log("Document written with ID: ", docRef.id);
    }
    console.log("Tüm veriler başarıyla eklendi.");
  } catch (e) {
    console.error("Error adding documents: ", e);
  }
};
