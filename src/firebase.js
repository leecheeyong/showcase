import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "project-showcase-b60de.firebaseapp.com",
  projectId: "project-showcase-b60de",
  storageBucket: "project-showcase-b60de.firebasestorage.app",
  messagingSenderId: "265517201692",
  appId: "1:265517201692:web:c9047dba9404f8f3c8e2d9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
