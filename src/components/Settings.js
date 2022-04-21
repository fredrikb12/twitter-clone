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
import { RoundedImage } from "./styled/RoundedImage";
import BarLoaderIcon from "./BarLoaderIcon";

function Settings() {
  const [user] = useOutletContext();
  const [userInfo, setUserInfo] = useState(null);

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

  function handleChange(e) {
    setUserInfo((prev) => {
      const obj = { ...prev };
      const name = e.target.name;
      const value = e.target.value;

      obj[name] = value;
      return { ...obj };
    });
  }

  async function submitInfo(e, field) {
    const userRef = doc(getDB(), "users", user.uid);
    const data = { ...userInfo };
    await updateDoc(userRef, data);
    console.log("updated");
  }

  return userInfo ? (
    <form>
      <div>
        <label>
          Edit Display Name
          <input
            onChange={handleChange}
            name="displayName"
            type="text"
            value={userInfo.displayName}
          />
        </label>
        <button type="button" onClick={(e) => submitInfo(e, "displayName")}>
          Submit Name
        </button>
      </div>
      <div>
        <label>
          Edit Bio
          <textarea
            onChange={handleChange}
            name="bio"
            type="text"
            value={userInfo.bio}
          />
        </label>
        <button type="button" onClick={(e) => submitInfo(e, "bio")}>
          Submit Bio
        </button>
      </div>
      <div>
        <label>
          Edit User Tag
          <input
            type="text"
            name="tag"
            onChange={handleChange}
            value={userInfo.tag}
          />
        </label>
        <button type="button" onClick={(e) => submitInfo(e, "tag")}>
          Submit tag
        </button>
      </div>
    </form>
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BarLoaderIcon />
    </div>
  );
}

export default Settings;
