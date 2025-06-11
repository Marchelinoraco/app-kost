import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

import { db } from "./configFirebase";

export async function tambahSuka(kostNama: string) {
  const docRef = doc(db, "kost", kostNama); // koleksi 'kost' berdasarkan nama
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      suka: increment(1),
    });
  } else {
    await setDoc(docRef, {
      suka: 1,
    });
  }
}

// Ambil 3 kost dengan jumlah suka terbanyak

// Kost detail lokal (pastikan ini sama dengan yang di CardDemo)

import { getDocs, collection } from "firebase/firestore";

export async function getTopKosts(limit = 3) {
  const snapshot = await getDocs(collection(db, "kost"));
  const allKosts = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: doc.id, // gunakan nama dokumen sebagai title
      price: data.harga || "N/A",
      image: data.gambar || "/placeholder.jpg", // fallback jika tidak ada gambar
      suka: data.suka || 0,
    };
  });

  // Urutkan berdasarkan jumlah suka
  const sorted = allKosts.sort((a, b) => b.suka - a.suka).slice(0, limit);

  return sorted;
}
