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
    ownerName: "Ahmet Yılmaz",
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
    ownerName: "Ayşe Demir",
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
    ownerName: "Berkay Aksoy",
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
    ownerName: "Zeynep Kaya",
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
    ownerName: "Selin Aydın",
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
    ownerName: "Mehmet Karaca",
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
    ownerName: "Elif Özkan",
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
    ownerName: "Merve Çetin",
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
    ownerName: "Efe Arslan",
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
    ownerName: "Burak Gündüz",
  },
  {
    age: 1,
    breed: "Bulldog",
    category: "Dogs",
    id: "Ly1nYchSjImnzHVfRWKW",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQxnFgkgWIYs3YGwiC2gycosxM1c-HSfYvg&s",
    name: "Max",
    weight: 20,
    sex: "Male",
    about: "Max is a lovable Bulldog who enjoys relaxing and being around people.",
    address: "Şirinyer Mahallesi, Buca, İzmir",
    ownerName: "Yasemin Sarı",
  },
  {
    age: 5,
    breed: "Turtle",
    category: "Reptiles",
    id: "QF5eCreNoAK4QaJZ8wAJ",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAQfRiMu8_Lcrb-zO5Zl9AuNpRkrt4-IMZZQ&s",
    name: "Shelly",
    weight: 2.0,
    sex: "Female",
    about: "Shelly is a calm turtle who enjoys basking under the heat lamp.",
    address: "Cumhuriyet Mahallesi, Muratpaşa, Antalya",
    ownerName: "Deniz Tekin",
  },
  {
    age: 1,
    breed: "Budgie",
    category: "Birds",
    id: "TJwdXvnVQLWx5akyRiIV",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgOnNmvKJSI5-YPodAOdXXtICRmPCHXqeptQ&s",
    name: "Sky",
    weight: 0.03,
    sex: "Female",
    about: "Sky is a lively budgie who enjoys chirping and exploring her cage.",
    address: "Orta Mahalle, Üsküdar, İstanbul",
    ownerName: "Nazlı Korkmaz",
  },
  {
    age: 3,
    breed: "Gecko",
    category: "Reptiles",
    id: "TfeUCc3sRcjDQUAtrfpT",
    imageUrl:
      "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk3MDc2MDI5Mjk3MTQwODE5/the-leopard-gecko-and-how-to-properly-care-for-one.jpg",
    name: "Lizzy",
    weight: 0.1,
    sex: "Female",
    about: "Lizzy is a friendly gecko who enjoys climbing and hiding in her enclosure.",
    address: "Güzelyalı Mahallesi, Konak, İzmir",
    ownerName: "Mustafa Yıldız",
  },
  {
    age: 3,
    breed: "Canary",
    category: "Birds",
    id: "YRLQ2IIMPvmGVhS2L1Tq",
    imageUrl: "https://www.unclebills.com/images/default-source/style/mosaic-canary.jpg?sfvrsn=fbd5f598_0",
    name: "Sunny",
    weight: 0.05,
    sex: "Male",
    about: "Sunny is a bright canary who fills the room with his cheerful songs.",
    address: "Fenerbahçe Mahallesi, Kadıköy, İstanbul",
    ownerName: "Kemal Kurt",
  },
  {
    age: 4,
    breed: "Maine Coon",
    category: "Cats",
    id: "aJp3aKHbu2QipAQ55xLq",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqpgLSEe4n3KiFnOWKZ7gx1Y1xOvqLuaKFAQ&s",
    name: "Leo",
    weight: 8.5,
    sex: "Male",
    about: "Leo is a majestic Maine Coon with a thick coat and a gentle nature.",
    address: "Çankaya Mahallesi, Çankaya, Ankara",
    ownerName: "Hüseyin Şen",
  },
  {
    age: 4,
    breed: "Iguana",
    category: "Reptiles",
    id: "ioqy1qeWKqYNwEvpSvpF",
    imageUrl: "https://i0.wp.com/reptifiles.com/wp-content/uploads/2017/04/Screen-Shot-2017-04-17-at-10.45.21-PM.png?fit=599%2C413&ssl=1",
    name: "Spike",
    weight: 2.3,
    sex: "Male",
    about: "Spike is a curious iguana who enjoys basking in the sun and exploring his surroundings.",
    address: "Fevzi Çakmak Mahallesi, Nilüfer, Bursa",
    ownerName: "Emre Demirci",
  },
  {
    age: 1,
    breed: "Angelfish",
    category: "Fishes",
    id: "rc2GlW71ZlVX8QH7ramI",
    imageUrl: "https://i.pinimg.com/736x/d8/8c/4d/d88c4d634c9aa0717283f1df8a86464a.jpg",
    name: "Angel",
    weight: 0.03,
    sex: "Female",
    about: "Angel is a graceful angelfish who glides through the water elegantly.",
    address: "Kültür Mahallesi, Seyhan, Adana",
    ownerName: "Meltem Polat",
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
    ownerName: "Hasan Toprak",
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
      weight: pet.weight,
      sex: pet.sex,
      about: pet.about,
      ownerName: pet.ownerName,
      address: pet.address,
      id: pet.id,
    });
    console.log(`Pet ${pet.name} updated with ID: ${pet.id}`);
  }
  console.log("Tüm veriler başarıyla güncellendi.");
};
