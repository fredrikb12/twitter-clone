import React from "react";
import { useOutletContext } from "react-router-dom";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { getDB } from "../firebase";
import BarLoaderIcon from "./BarLoaderIcon";
import { SecondaryLink, StyledLink } from "./styled/Links.styled";
import placeholderProfilePic from "../images/placeholder.svg";
import { RoundedImage } from "./styled/RoundedImage";
import Button, { DeleteButton } from "./Button";
import { StyledDeleteButton } from "./styled/Button.styled";

function TweetsFeed({ tweetData, isLoading }) {
  const [user] = useOutletContext();
  async function deleteTweet(userID, tweet) {
    const userRef = doc(getDB(), "users", userID);

    const tweetToRemove = {
      author: tweet.author,
      createdAt: tweet.createdAt,
      id: tweet.id,
      photoURL: tweet.photoURL,
      text: tweet.text,
    };

    await updateDoc(userRef, {
      tweets: arrayRemove(tweetToRemove),
    });
  }

  if (tweetData && tweetData.length > 0) {
    return tweetData.map((tweet, index) => {
      return (
        <div style={{ padding: "20px", position: "relative" }} key={index}>
          {user.uid === tweet.author ? (
            <DeleteButton
              onClick={() => {
                deleteTweet(tweet.author, tweet);
              }}
            >
              Delete
            </DeleteButton>
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
          <p style={{ padding: "12px 0" }}>{tweet.text}</p>
          <p
            style={{ padding: "3px 0", color: "#ababab", fontSize: "0.85rem" }}
          >
            {`${convertSeconds(tweet.createdAt)}`}
          </p>
        </div>
      );
    });
  } else if (tweetData.length === 0 && !isLoading) {
    return (
      <div>
        <p>No tweets yet...</p>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BarLoaderIcon />
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
