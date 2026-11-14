import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alphaai-9792f.firebaseapp.com",
  projectId: "alphaai-9792f",
  storageBucket: "alphaai-9792f.firebasestorage.app",
  messagingSenderId: "825196156293",
  appId: "1:825196156293:web:7556c1f3ad02447a1d60ec"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()