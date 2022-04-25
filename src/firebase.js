import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHP4r8MludFCs-GL33Ob1IZiJRMTqa50A",
  authDomain: "twitter-clone-9cf6b.firebaseapp.com",
  projectId: "twitter-clone-9cf6b",
  storageBucket: "twitter-clone-9cf6b.appspot.com",
  messagingSenderId: "645664955722",
  appId: "1:645664955722:web:972076e4a5161c0e9b75b3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const getAppAuth = () => {
  return auth;
};

const getDB = () => {
  return db;
};

const isUserSignedIn = () => {
  return !!getAuth().currentUser;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export { getAppAuth, getDB, isUserSignedIn };
