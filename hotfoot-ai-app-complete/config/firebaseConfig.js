import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2hI3Uyvmaw31xmUcLX1waCBGoxa-bNi4",
  authDomain: "tripify-bc166.firebaseapp.com",
  projectId: "tripify-bc166",
  storageBucket: "tripify-bc166.firebasestorage.app",
  messagingSenderId: "183104668317",
  appId: "1:183104668317:web:527f734085543ba1c28a74",
  measurementId: "G-L6SW6J95GE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
