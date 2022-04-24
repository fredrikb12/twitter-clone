import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getDB } from "../firebase";
import placeholder from "../images/placeholder.svg";
import StyledProfilePicture from "./styled/StyledProfilePicture";
import StyledTweetForm from "./styled/StyledTweetForm";
import uniqid from "uniqid";
import Button from "./Button";

function CreateTweet() {
  const [tweet, setTweet] = useState("");
  const [user] = useOutletContext();

  function handleInput(e) {
    setTweet(() => e.target.value);
  }

  async function handleTweet(e) {
    e.preventDefault();
    console.log(tweet);

    /*const tweets = collection(`users/${user.uid}/tweets`);
    console.log(tweets);
    const userRef = doc(getDB(), "users", user.uid);*/

    /*const tweetsRef = collection(getDB(), "tweets");
    await addDoc(tweetsRef, {
      text: tweet,
      author: user.uid,
      createdAt: serverTimestamp(),
      photoURL: null,
    });*/

    const userRef = doc(getDB(), "users", user.uid);
    await updateDoc(userRef, {
      tweets: arrayUnion({
        text: tweet,
        author: user.uid,
        createdAt: new Date().getTime(),
        photoURL: user.photoURL,
        id: uniqid(),
      }),
    });

    /*await setDoc(doc(getDB(), "tweets"), {
      text: tweet,
      author: user.uid,
      createdAt: serverTimestamp(),
      photoURL: null,
    });*/

    /*await updateDoc(userRef, {
      tweets: arrayUnion({
        text: tweet,
        author: user.uid,
        createdAt: serverTimestamp(),
        photoURL: null,
      }),
    });/*

    /*await setDoc(doc(getDB(), "users", user.uid), {
      text: tweet,
      author: user.uid,
      createdAt: serverTimestamp(),
      photoURL: null,
    });*/
    console.log("tweet posted");
    setTweet(() => "");
  }
  return (
    <StyledTweetForm>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <div style={{ padding: "10px" }}>
          <StyledProfilePicture
            src={user.photoURL}
            alt="profile"
          ></StyledProfilePicture>
        </div>
        <div>
          <textarea
            maxLength={280}
            cols="40"
            rows="8"
            value={tweet}
            onChange={handleInput}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #ababab",
              resize: "none",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>

      <Button
        onClick={handleTweet}
      >
        Tweet
      </Button>
    </StyledTweetForm>
  );
}

export default CreateTweet;
