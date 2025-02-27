// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-Mb8pRV8GSc7HNyngtxv6nB9vHcEIIYM",
  authDomain: "treinospersonalizados-713ce.firebaseapp.com",
  projectId: "treinospersonalizados-713ce",
  storageBucket: "treinospersonalizados-713ce.firebasestorage.app",
  messagingSenderId: "263992673845",
  appId: "1:263992673845:web:ddd1767aed661dc45a137c",
  measurementId: "G-CLNR9JC8Z4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
