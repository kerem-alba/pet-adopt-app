import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

// Pet verileriniz
const pets = [
  {
    age: 2,
    breed: "Labrador",
    category: "Dogs",
    id: "0ZSjzp6cANQ1EvdtGzdA",
    imageUrl: "https://i.pinimg.com/236x/5e/12/41/5e124156e7e6ee1e08e651bff1e4a16e.jpg",
    name: "Buddy",
    weight: 30,
    sex: "Male",
    about: "Buddy is a playful Labrador who loves fetching sticks and swimming in the lake.",
    address: "Bağdat Caddesi, Kadıköy, İstanbul",
    owner: {
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=E2LI0GQ7_ToC&format=png&color=000000",
    },
  },
  {
    age: 3,
    breed: "Beagle",
    category: "Dogs",
    id: "1zelT3L1OwDkc40t0c8E",
    imageUrl:
      "https://www.pdsa.org.uk/media/7704/beagle-outdoors-gallery-7-min.jpg?anchor=center&mode=crop&quality=100&height=500&bgcolor=fff&rnd=132158008000000000",
    name: "Charlie",
    weight: 10,
    sex: "Male",
    about: "Charlie is a curious Beagle who enjoys sniffing around and exploring new places.",
    address: "Kordonboyu Mahallesi, Alsancak, İzmir",
    owner: {
      name: "Ayşe Demir",
      email: "ayse.demir@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=ZmWFAq0mS7su&format=png&color=000000",
    },
  },
  {
    age: 2,
    breed: "Chameleon",
    category: "Reptiles",
    id: "6OqbKZUa66QTuwSKwTlQ",
    imageUrl:
      "https://www.evolutionreptiles.co.uk/wp-content/uploads/elementor/thumbs/Hector-the-panther-chameleon-6-odw8t47605w01sufok6wg5ys052lls4rn4218oaaqa.jpg",
    name: "Camo",
    weight: 0.2,
    sex: "Male",
    about: "Camo is a colorful chameleon who can change his colors to blend in with his surroundings.",
    address: "Atatürk Caddesi, Bornova, İzmir",
    owner: {
      name: "Berkay Aksoy",
      email: "berkay.aksoy@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=E2LI0GQ7_ToC&format=png&color=000000",
    },
  },
  {
    age: 1,
    breed: "Guppy",
    category: "Fishes",
    id: "6fxKuQIMJ94QYmVGVvLq",
    imageUrl: "https://cdn.britannica.com/02/117202-004-526214C9/Guppy.jpg",
    name: "Splash",
    weight: 0.02,
    sex: "Female",
    about: "Splash is a vibrant guppy who enjoys swimming around and showing off her colorful fins.",
    address: "Fatih Mahallesi, Çankaya, Ankara",
    owner: {
      name: "Zeynep Kaya",
      email: "zeynep.kaya@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=ZmWFAq0mS7su&format=png&color=000000",
    },
  },
  {
    age: 5,
    breed: "Parrot",
    category: "Birds",
    id: "8yP56eWU4lIel3puwkWH",
    imageUrl: "https://blog.petloverscentre.com/wp-content/uploads/2022/05/Building-the-habitat-for-pet-parrots.png",
    name: "Polly",
    weight: 0.4,
    sex: "Female",
    about: "Polly is a talkative parrot who loves to mimic sounds and interact with people.",
    address: "İstiklal Caddesi, Beyoğlu, İstanbul",
    owner: {
      name: "Selin Aydın",
      email: "selin.aydin@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=ZmWFAq0mS7su&format=png&color=000000",
    },
  },
  {
    age: 2,
    breed: "Persian",
    category: "Cats",
    id: "BADAKfbYVBGM6kAT3mzl",
    imageUrl: "https://avsab.org/wp-content/uploads/2021/07/sergey-semin-I9cHfDYLT3E-unsplash-1038x692.jpg",
    name: "Whiskers",
    weight: 4.5,
    sex: "Male",
    about: "Whiskers is a fluffy Persian cat who enjoys lounging around and being pampered.",
    address: "Gazipaşa Bulvarı, Seyhan, Adana",
    owner: {
      name: "Mehmet Karaca",
      email: "mehmet.karaca@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=E2LI0GQ7_ToC&format=png&color=000000",
    },
  },
  {
    age: 5,
    breed: "Golden Retriever",
    category: "Dogs",
    id: "CMmEeWNCaSXuoSQ9hO5R",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg6VwSufMS-d9fS-KcftVHCIw8tnTcE2yhJQ&s",
    name: "Bailey",
    weight: 32,
    sex: "Female",
    about: "Bailey is a friendly Golden Retriever who loves playing fetch and spending time outdoors.",
    address: "Karşıyaka Mahallesi, Konak, İzmir",
    owner: {
      name: "Elif Özkan",
      email: "elif.ozkan@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=ZmWFAq0mS7su&format=png&color=000000",
    },
  },
  {
    age: 2,
    breed: "Cockatiel",
    category: "Birds",
    id: "Flz07ZgYXaAIB9POoUFs",
    imageUrl: "https://cdn.dotpe.in/longtail/store-items/7562157/gKI33cVY.jpeg",
    name: "Chirpy",
    weight: 0.09,
    sex: "Female",
    about: "Chirpy is a cheerful cockatiel who loves singing and whistling along with music.",
    address: "Ataşehir Bulvarı, Ataşehir, İstanbul",
    owner: {
      name: "Merve Çetin",
      email: "merve.cetin@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=ZmWFAq0mS7su&format=png&color=000000",
    },
  },
  {
    age: 3,
    breed: "British",
    category: "Cats",
    id: "GxwLp4fc6Dzvcc1JyFYO",
    imageUrl: "https://wimpycathouse.com/wp-content/uploads/2020/03/Shelly-4.jpg",
    name: "Saga",
    weight: 4.0,
    sex: "Female",
    about: "Saga is a beautiful British cat with a calm and gentle temperament.",
    address: "Piri Reis Mahallesi, Çankaya, Ankara",
    owner: {
      name: "Efe Arslan",
      email: "efe.arslan@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=E2LI0GQ7_ToC&format=png&color=000000",
    },
  },
  {
    age: 1,
    breed: "Siamese",
    category: "Cats",
    id: "LsTw4GlG3oBhtbdgzCJl",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuaxE2LF_TqCfSWzk-Gwae7hm8cWhuNDBKw&s",
    name: "Milo",
    weight: 3.5,
    sex: "Male",
    about: "Milo is a playful Siamese kitten who loves to chase toys and explore his surroundings.",
    address: "Mehmet Akif Ersoy Mahallesi, Kepez, Antalya",
    owner: {
      name: "Burak Gündüz",
      email: "burak.gunduz@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=E2LI0GQ7_ToC&format=png&color=000000",
    },
  },
  {
    age: 3,
    breed: "Scottish Fold",
    category: "Cats",
    id: "ynq7EJPFEj2FNRGIi6mk",
    imageUrl: "https://previews.123rf.com/images/mdmmikle/mdmmikle1206/mdmmikle120600191/19392224-scottish-fold-head-on-yellow-background.jpg",
    name: "Bücürük",
    weight: 5,
    sex: "Male",
    about: "Bücürük is a playful Scottish Fold with a unique look and a friendly personality.",
    address: "Barbaros Mahallesi, Antalya",
    owner: {
      name: "Hasan Toprak",
      email: "hasan.toprak@gmail.com",
      imageUrl: "https://img.icons8.com/?size=100&id=E2LI0GQ7_ToC&format=png&color=000000",
    },
  },
];

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

export const fetchPets = async () => {
  const petsCollectionRef = collection(db, "Pets");
  const petsSnapshot = await getDocs(petsCollectionRef);

  const petDataList = [];
  petsSnapshot.forEach((petDoc) => {
    petDataList.push({ id: petDoc.id, ...petDoc.data() });
  });

  console.log("Tüm pet verileri:", petDataList);
  return petDataList;
};

export const updatePetsWithNewData = async () => {
  for (const pet of pets) {
    const petDocRef = doc(db, "Pets", pet.id);
    await updateDoc(petDocRef, {
      ownerName: pet.ownerName,
      ownerEmail: pet.ownerEmail,
      ownerImageUrl: pet.ownerImageUrl,
    });
    console.log(`Pet ${pet.name} updated with ID: ${pet.id}`);
  }
  console.log("Tüm veriler başarıyla güncellendi.");
};
