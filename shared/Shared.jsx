import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const GetFavList = async (user) => {
  const docSnap = await getDoc(doc(db, "UserFavorites", user?.primaryEmailAddress?.emailAddress));
  if (docSnap.exists()) {
    return docSnap.data();
  }
  await setDoc(doc(db, "UserFavorites", user?.primaryEmailAddress?.emailAddress), {
    email: user?.primaryEmailAddress?.emailAddress,
    favorites: [],
  });
};

const UpdateFavorite = async (user, favorites) => {
  const docRef = doc(db, "UserFavorites", user?.primaryEmailAddress?.emailAddress);
  await updateDoc(docRef, {
    favorites: favorites,
  });
};

export default { GetFavList, UpdateFavorite };
