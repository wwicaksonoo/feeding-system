import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Langsung masukkan link-nya di sini untuk tes
  databaseURL: "https://feeding-system-7b407-default-rtdb.asia-southeast1.firebasedatabase.app/", 
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

export { db };