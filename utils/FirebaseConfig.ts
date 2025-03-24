// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAfabAFvoKLF_ednH5qiJW5YCNK3vWVIE",
  authDomain: "chatgpt-movil.firebaseapp.com",
  projectId: "chatgpt-movil",
  storageBucket: "chatgpt-movil.firebasestorage.app",
  messagingSenderId: "733746022703",
  appId: "1:733746022703:web:fdf85f1c33eec4e76339da",
  measurementId: "G-X4K1GLD56H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

