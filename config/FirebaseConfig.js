// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-app-krm.firebaseapp.com",
  projectId: "pet-adopt-app-krm",
  storageBucket: "pet-adopt-app-krm.appspot.com",
  messagingSenderId: "206239769684",
  appId: "1:206239769684:web:44e63676c1d8609eecf9c1",
  measurementId: "G-5SK3KSDGMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Bu ayarı ekliyoruz
});

export const storage = getStorage(app);
