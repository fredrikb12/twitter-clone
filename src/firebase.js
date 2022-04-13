import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHP4r8MludFCs-GL33Ob1IZiJRMTqa50A",
  authDomain: "twitter-clone-9cf6b.firebaseapp.com",
  projectId: "twitter-clone-9cf6b",
  storageBucket: "twitter-clone-9cf6b.appspot.com",
  messagingSenderId: "645664955722",
  appId: "1:645664955722:web:972076e4a5161c0e9b75b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const getAppAuth = () => {
  return auth;
};

const getDB = () => {
  return db;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export { getAppAuth, getDB };
