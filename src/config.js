import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBj7PD2ANUkOaFs3IjEUvN2qXM8KGUcr3Q",
  authDomain: "duantotnghiepreact.firebaseapp.com",
  databaseURL: "https://duantotnghiepreact-default-rtdb.firebaseio.com",
  projectId: "duantotnghiepreact",
  storageBucket: "duantotnghiepreact.appspot.com",
  messagingSenderId: "850540325665",
  appId: "1:850540325665:web:392fe9ff0bca99d18a2c60",
  measurementId: "G-6N96C6V7LY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
