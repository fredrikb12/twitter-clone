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
  const [userInfo, setUserInfo] = useState([]);
  const [tweets, setTweets] = useState([]);
  const { userTag } = useParams();

  useEffect(() => {
    async function loadUserTweets() {
      const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("tag", "==", userTag));
      const qSnap = await getDocs(q);

      let data = [];

      qSnap.forEach((doc) => {
        console.log(doc.data());
        const userData = doc.data();
        setUserInfo(() => {
          return [
            {
              bio: userData.bio,
              displayName: userData.displayName,
              followers: userData.followers.length,
              following: userData.following.length,
              tweets: userData.tweets.length,
            },
          ];
        });
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
    async function loadUserInfo() {
      const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("tag", "==", userTag));
      const qSnap = await getDocs(q);

      qSnap.forEach((doc) => {});
    }
    loadUserInfo();
  }, [userTag]);

  return (
    <div>
      {userInfo[0]
        ? userInfo.map((item, index) => {
            return (
              <div key={index}>
                <h1>{item.displayName}</h1>
                <p>{item.bio}</p>
                <p>followers: {item.followers}</p>
                <p>following: {item.following}</p>
              </div>
            );
          })
        : null}
      <TweetsFeed tweetData={tweets} />
    </div>
  );
}

export default Profile;
