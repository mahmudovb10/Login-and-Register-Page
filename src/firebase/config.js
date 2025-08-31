import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZH-qGbahj38aPVAW_HzDg3UyKQruTsc8",
  authDomain: "test-385cf.firebaseapp.com",
  projectId: "test-385cf",
  storageBucket: "test-385cf.firebasestorage.app",
  messagingSenderId: "122768731365",
  appId: "1:122768731365:web:009a915ef94bbfcd8f780c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);

// db
export const db = getFirestore(app);
