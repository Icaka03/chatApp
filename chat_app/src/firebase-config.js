// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnhcDQsm2SxavnbxkYPnfJLsEsUReAl-g",
  authDomain: "chatapp-b5229.firebaseapp.com",
  projectId: "chatapp-b5229",
  storageBucket: "chatapp-b5229.appspot.com",
  messagingSenderId: "1083247212925",
  appId: "1:1083247212925:web:2a756c7697dbdda2537414",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
