import React, { useEffect, useState } from "react";
import { getDB } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  whereField,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Search from "./components/Search";
import { StyledLink } from "./components/styled/Links.styled";
import { RoundedImage } from "./components/styled/RoundedImage.js";

function RightSidebar({ user }) {
  const [suggestions, setSuggestions] = useState([]);
  const [key, setKey] = useState(user.uid);
  useEffect(() => {
    setKey(() => user.uid);
  }, [user]);

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  useEffect(() => {
    async function loadSuggestions() {
      const usersRef = collection(getDB(), "users");
      const q = query(
        usersRef,
        where("uid", ">", key),
        orderBy("uid", "desc"),
        limit(1)
      );
      let qSnap = await getDocs(q);
      if (qSnap.size > 0) {
        qSnap.forEach((doc) => {
          setSuggestions((prev) => {
            if (prev.length > 0 && prev[0].uid === doc.data().uid)
              return [...prev];
            else return [...prev, doc.data()];
          });
        });
      } else {
        const q = query(
          usersRef,
          where("uid", "<", key),
          orderBy("uid", "desc"),
          limit(1)
        );
        let qSnap = await getDocs(q);
        if (qSnap.size > 0) {
          qSnap.forEach((doc) => {
            setSuggestions((prev) => {
              if (prev.length > 0 && prev[0].uid === doc.data().uid)
                return [...prev];
              else return [...prev, doc.data()];
            });
          });
        }
      }
    }

    loadSuggestions();
  }, [user.uid, suggestions.length, key]);

  return (
    <div>
      <Search />
      <h3>Suggested for you:</h3>
      {suggestions
        ? suggestions.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
                key={index}
              >
                <RoundedImage
                  style={{ width: "30px", height: "30px" }}
                  src={item.photoURL}
                  alt={`profile of ${item.displayName}`}
                />
                <StyledLink as="a" href={`/profiles/${item.tag}`}>
                  <p>{item.displayName}</p>
                </StyledLink>
              </div>
            );
          })
        : null}
    </div>
  );
}
export default RightSidebar;
