
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC-Mb8pRV8GSc7HNyngtxv6nB9vHcEIIYM",
  authDomain: "treinospersonalizados-713ce.firebaseapp.com",
  projectId: "treinospersonalizados-713ce",
  storageBucket: "treinospersonalizados-713ce.firebasestorage.app",
  messagingSenderId: "263992673845",
  appId: "1:263992673845:web:ddd1767aed661dc45a137c",
  measurementId: "G-CLNR9JC8Z4",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
