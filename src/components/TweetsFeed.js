import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function TweetsFeed({ tweetData }) {
  useEffect(() => {
    async function getUserNames() {
      if (tweetData && tweetData[0].tweets) {
        console.log(tweetData);
      }
    }
    getUserNames();
  }, [tweetData]);

  if (tweetData) {
    console.log("tweetData: ", tweetData);
    return tweetData.map((tweet, index) => {
      console.log(tweet);
      return (
        <div key={index}>
          <Link to={`/profiles/${tweet.userName}`}><p>{tweet.authorName}</p></Link>
          <p>{tweet.text}</p>
          <p>{convertSeconds(tweet.createdAt.seconds)}</p>
        </div>
      );
    });
  }
}

function convertSeconds(seconds) {
  const date = new Date(seconds * 1000);
  const returnD = formatDate(date);
  console.log(returnD);
  return returnD;
  //return date;
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
