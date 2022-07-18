import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getDB } from "../firebase";
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
            cols="25"
            rows="8"
            value={tweet}
            onChange={handleInput}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #ababab",
              resize: "none",
              borderRadius: "8px",
              color: "#cdcdcd",
              padding: "5px",
              fontSize: "0.9rem",
            }}
          />
        </div>
      </div>

      <Button onClick={handleTweet}>Tweet</Button>
    </StyledTweetForm>
  );
}

export default CreateTweet;
