import React, { useState, useEffect, useRef } from "react";
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
import { StyledSettings } from "./styled/Settings.styled";
import Button from "./Button";

function Settings() {
  const [user] = useOutletContext();
  const [userInfo, setUserInfo] = useState(null);
  const tagRef = useRef();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(getDB(), "users", user.uid), (doc) => {
      setUserInfo(() => {
        return { ...doc.data() };
      });
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    //console.log(userInfo);
  }, [userInfo]);

  function handleChange(e) {
    setUserInfo((prev) => {
      tagRef.current.style = "";
      const obj = { ...prev };
      const name = e.target.name;
      const value = e.target.value;

      obj[name] = value;
      return { ...obj };
    });
  }

  async function submitInfo(e) {
    const userRef = doc(getDB(), "users", user.uid);
    const data = { ...userInfo };

    const usersRef = collection(getDB(), "users");
    const q = query(usersRef, where("tag", "==", data.tag));
    const qSnap = await getDocs(q);

    const docs = [];
    qSnap.forEach((doc) => {
      docs.push(doc.data());
    });
    if (docs.length === 0) {
      await updateDoc(userRef, data);
    } else if (docs[0].uid !== user.uid) {
      const tag = tagRef.current;
      tag.style.borderColor = "red";
      tag.style.borderWidth = "2px";
    }
  }

  return userInfo ? (
    <StyledSettings>
      <div>
        <label>
          Display Name
          <input
            onChange={handleChange}
            name="displayName"
            type="text"
            value={userInfo.displayName}
          />
        </label>
      </div>
      <div>
        <label>
          Bio
          <textarea
            onChange={handleChange}
            name="bio"
            type="text"
            value={userInfo.bio}
            cols="25"
            rows="4"
          />
        </label>
      </div>
      <div>
        <label>
          User Tag
          <input
            ref={tagRef}
            type="text"
            name="tag"
            onChange={handleChange}
            value={userInfo.tag}
          />
        </label>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submitInfo(e);
          }}
        >
          Submit changes
        </Button>
      </div>
    </StyledSettings>
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BarLoaderIcon />
    </div>
  );
}

export default Settings;
