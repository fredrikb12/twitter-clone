import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getDB } from "../firebase";
import TweetsFeed from "./TweetsFeed";

function Profile() {
  const [user] = useOutletContext();
  const [tweets, setTweets] = useState([]);
  const [tweetsToRender, setTweetsToRender] = useState([]);
  const { userTag } = useParams();

  useEffect(() => {
    async function loadUserTweets() {
      const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("tag", "==", userTag));

      const qSnap = await getDocs(q);
      let data = [];
      qSnap.forEach((doc) => {
        //data.push(doc.data());
        console.log(doc.data());
        // console.log("data: ", data[0]);
        const tweetData = doc.data().tweets.map((tweet) => {
          return {
            ...tweet,
            authorName: doc.data().displayName,
            userName: doc.data().tag,
          };
        });
        data.push(...tweetData);
      });
      setTweets(() => {
        return [...data];
      });

      /*const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("tag", "==", userTag));
      //const userRef = doc(usersRef, where("tag", "==", userTag));
      console.log(userTag);

      const userSnap = await getDocs(q);
      if (userSnap) {
        console.log("doc data: ", userSnap);
      }*/
    }
    loadUserTweets();
  }, [user.uid, userTag]);

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);

  let renderTweets = [];
  if (tweets && tweets.tweets && tweets.tweets.length > 0) {
    renderTweets = tweets.tweets.map((tweet) => {
      return {
        text: tweet.text,
        author: tweets.displayName,
        tag: tweets.tag,
        createdAt: tweet.createdAt.seconds,
      };
    });
    setTweetsToRender(() => {
      return renderTweets;
    });
  }

  return (
    <div>
      <TweetsFeed tweetData={tweets} />
    </div>
  );
}

export default Profile;
