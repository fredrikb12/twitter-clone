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

function CreateTweet() {
  const [tweet, setTweet] = useState("");
  const [user] = useOutletContext();

  function handleInput(e) {
    setTweet(e.target.value);
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
        createdAt: new Date(),
        photoURL: null,
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
  }
  return (
    <StyledTweetForm>
      <div>
        <StyledProfilePicture
          src={placeholder}
          alt="placeholder"
        ></StyledProfilePicture>
      </div>
      <div>
        <textarea
          maxLength={280}
          cols="40"
          rows="8"
          value={tweet}
          onChange={handleInput}
        />

        <button onClick={handleTweet}>Tweet</button>
      </div>
    </StyledTweetForm>
  );
}

export default CreateTweet;
