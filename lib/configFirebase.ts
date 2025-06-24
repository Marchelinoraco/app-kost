// lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// Konfigurasi Firebase-mu
const firebaseConfig = {
  apiKey: "AIzaSyAoBo-5-Mqme5AkRaG03Os2j6UKsLYLMkU",
  authDomain: "tania-2e626.firebaseapp.com",
  projectId: "tania-2e626",
  storageBucket: "tania-2e626.appspot.com",
  messagingSenderId: "824737806415",
  appId: "1:824737806415:web:153c72fad3fb780444d23a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Tipe data riwayat pencarian
export type RiwayatPencarian = {
  id?: string; // ← tambahkan ini
  query: string;
  hasil: any[];
  createdAt?: Timestamp;
};

export async function fetchSearchHistory(
  maxItems = 20
): Promise<RiwayatPencarian[]> {
  const colRef = collection(db, "riwayat_pencarian");
  const q = query(colRef, orderBy("createdAt", "desc"), limit(maxItems));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    ...(doc.data() as RiwayatPencarian),
    id: doc.id, // ← tambahkan ini
  }));
}
