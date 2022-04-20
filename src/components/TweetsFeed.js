import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function TweetsFeed({ tweetData }) {
  /*useEffect(() => {
    async function getUserNames() {
      if (tweetData && tweetData[0] && tweetData[0].tweets) {
        console.log(tweetData);
      }
    }
    getUserNames();
  }, [tweetData]);*/

  if (tweetData) {
    return tweetData.map((tweet, index) => {
      return (
        <div style={{ padding: "20px" }} key={index}>
          <Link to={`/profiles/${tweet.userName}`}>
            <p style={{ padding: " 6px 0" }}>{tweet.authorName}</p>
          </Link>
          <p style={{ padding: "6px 0" }}>{tweet.text}</p>
          <p style={{ padding: "6px 0" }}>
            {convertSeconds(tweet.createdAt.seconds)}
          </p>
        </div>
      );
    });
  }
}

function convertSeconds(seconds) {
  const date = new Date(seconds * 1000);
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
