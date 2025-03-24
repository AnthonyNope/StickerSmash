// utils/FirebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAfabAFvoKLF_ednH5qiJW5YCNK3vWVIE",
  authDomain: "chatgpt-movil.firebaseapp.com",
  projectId: "chatgpt-movil",
  storageBucket: "chatgpt-movil.appspot.com", // corregido firebasestorage.app 
  messagingSenderId: "733746022703",
  appId: "1:733746022703:web:fdf85f1c33eec4e76339da",
  measurementId: "G-X4K1GLD56H" // este lo podés dejar o quitar, no afecta
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
