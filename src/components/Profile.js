import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
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
import TweetsFeed from "./TweetsFeed";
import UserInfo from "./UserInfo";

function Profile() {
  const [user] = useOutletContext();
  const [userInfo, setUserInfo] = useState([]);
  const [tweets, setTweets] = useState([]);
  const { userTag } = useParams();
  const [isFollowed, setisFollowed] = useState(false);

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
    });

    return () => unsubscribe();
    /*async function loadUserTweets() {
      const qSnap = await getDocs(q);

      /* let data = [];

      qSnap.forEach((doc) => {
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
    }

    loadUserTweets();*/
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
    setisFollowed((prev) => {
      return !prev;
    });
  }

  async function unfollowUser(id) {
    const userRef = doc(getDB(), "users", id);
    if (!userRef) return;
    console.log(userRef);
    await updateDoc(userRef, {
      followers: arrayRemove(user.uid),
    });
    setisFollowed((prev) => {
      return !prev;
    });
  }

  return (
    <>
      <UserInfo
        userInfo={userInfo}
        isFollowed={isFollowed}
        unfollowUser={unfollowUser}
        followUser={followUser}
      />
      <TweetsFeed tweetData={tweets} />
    </>
  );
}

export default Profile;
