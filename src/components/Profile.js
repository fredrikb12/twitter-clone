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
  const { userTag } = useParams();

  useEffect(() => {
    async function loadUserTweets() {
      const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("tag", "==", userTag));
      const qSnap = await getDocs(q);

      let data = [];

      qSnap.forEach((doc) => {
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
    }

    loadUserTweets();
  }, [user.uid, userTag]);

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);

  return (
    <div>
      <TweetsFeed tweetData={tweets} />
    </div>
  );
}

export default Profile;
