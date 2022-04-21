import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDB } from "../firebase";

function Settings() {
  const [user] = useOutletContext();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(getDB(), "users", user.uid), (doc) => {
      setUserInfo(() => {
        return { ...doc.data() };
      });
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return <div></div>;
}

export default Settings;
