import React, { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
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
import BarLoaderIcon from "./BarLoaderIcon";
import { SecondaryLink, StyledLink } from "./styled/Links.styled";
import placeholderProfilePic from "../images/placeholder.svg";
import { RoundedImage } from "./styled/RoundedImage";

function TweetsFeed({ tweetData }) {
  const [user] = useOutletContext();

  /*useEffect(() => {
    async function getUserNames() {
      if (tweetData && tweetData[0] && tweetData[0].tweets) {
        console.log(tweetData);
      }
    }
    getUserNames();
  }, [tweetData]);*/

  async function deleteTweet(userID, tweet) {
    const userRef = doc(getDB(), "users", userID);
    const user = await getDoc(userRef);

    const tweetToRemove = {
      author: tweet.author,
      createdAt: tweet.createdAt,
      id: tweet.id,
      photoURL: tweet.photoURL,
      text: tweet.text,
    };

    console.log(user.data());
    console.log(tweet);
    //console.log(tweet);
    await updateDoc(userRef, {
      tweets: arrayRemove(tweetToRemove),
    });
  }

  if (tweetData && tweetData.length > 0) {
    return tweetData.map((tweet, index) => {
      return (
        <div style={{ padding: "20px", position: "relative" }} key={index}>
          {user.uid === tweet.author ? (
            <button
              onClick={() => {
                deleteTweet(tweet.author, tweet);
              }}
              style={{ position: "absolute", top: "5px", right: "5px" }}
            >
              Delete
            </button>
          ) : null}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <RoundedImage
              src={tweet.photoURL || placeholderProfilePic}
              alt="profile"
              style={{ width: "30px" }}
            />
            <StyledLink to={`/profiles/${tweet.userName}`}>
              <p style={{ padding: " 2px 0", fontWeight: "700" }}>
                {tweet.authorName}
              </p>
            </StyledLink>
            <SecondaryLink to={`/profiles/${tweet.userName}`}>
              <p style={{ fontSize: "0.9rem" }}>@{tweet.userName}</p>
            </SecondaryLink>
          </div>
          <p style={{ padding: "6px 0" }}>{tweet.text}</p>
          <p style={{ padding: "6px 0" }}>
            {`${convertSeconds(tweet.createdAt)}`}
          </p>
        </div>
      );
    });
  } else if (!tweetData) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BarLoaderIcon />
      </div>
    );
  } else {
    return (
      <div>
        <p>No tweets yet...</p>
      </div>
    );
  }
}

function convertSeconds(seconds) {
  const date = new Date(seconds);
  const returnD = formatDate(date);
  return returnD;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

export default TweetsFeed;
