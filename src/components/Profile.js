import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDB } from "../firebase";
import TweetsFeed from "./TweetsFeed";
import UserInfo from "./UserInfo";
import LowWidthSearch from "./LowWidthSearch";

function Profile() {
  const [user] = useOutletContext();
  const [userInfo, setUserInfo] = useState([]);
  const [tweets, setTweets] = useState([]);
  const { userTag } = useParams();
  const [isFollowed, setisFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usersRef = collection(getDB(), "users");
    const q = query(usersRef, where("tag", "==", userTag));
    const unsubscribe = onSnapshot(q, (qSnapshot) => {
      let data = [];

      qSnapshot.forEach((doc) => {
        const userData = doc.data();
        setisFollowed(() => {
          return userData.followers.includes(user.uid);
        });
        setUserInfo(() => {
          return [
            {
              bio: userData.bio,
              displayName: userData.displayName,
              followersLength: userData.followers.length,
              followers: userData.followers,
              following: userData.following.length,
              tweets: userData.tweets.length,
              uid: userData.uid,
            },
          ];
        });
        const tweetData = doc
          .data()
          .tweets.map((tweet) => {
            return {
              ...tweet,
              authorName: doc.data().displayName,
              userName: doc.data().tag,
            };
          })
          .sort((a, b) => {
            return b.createdAt - a.createdAt;
          });

        data.push(...tweetData);
      });

      setTweets(() => {
        return [...data];
      });
      setIsLoading(() => false);
    });

    return () => unsubscribe();
    
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

  async function followUser(id) {
    const userRef = doc(getDB(), "users", id);
    await updateDoc(userRef, {
      followers: arrayUnion(user.uid),
    });
    const currentUserRef = doc(getDB(), "users", user.uid);
    await updateDoc(currentUserRef, {
      following: arrayUnion(id),
    });
  }

  async function unfollowUser(id) {
    const userRef = doc(getDB(), "users", id);
    if (!userRef) return;
    await updateDoc(userRef, {
      followers: arrayRemove(user.uid),
    });
    const currentUserRef = doc(getDB(), "users", user.uid);
    await updateDoc(currentUserRef, {
      following: arrayRemove(id),
    });
  }

  return (
    <>
      <LowWidthSearch style={{ border: "none", position: "relative" }} />
      <UserInfo
        userInfo={userInfo}
        isFollowed={isFollowed}
        unfollowUser={unfollowUser}
        followUser={followUser}
      />
      <TweetsFeed tweetData={tweets} isLoading={isLoading} />
    </>
  );
}

export default Profile;
