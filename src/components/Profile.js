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

function Profile() {
  const [user] = useOutletContext();
  const [userInfo, setUserInfo] = useState([]);
  const [tweets, setTweets] = useState([]);
  const { userTag } = useParams();
  const [isFollowed, setisFollowed] = useState(false);

  useEffect(() => {
    async function loadUserTweets() {
      const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("tag", "==", userTag));
      const qSnap = await getDocs(q);

      let data = [];

      qSnap.forEach((doc) => {
        console.log(doc.data());
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
    <div>
      {userInfo[0]
        ? userInfo.map((item, index) => {
            if (index > 0) return null;
            return (
              <div key={index}>
                <h1>{item.displayName}</h1>
                <p>{item.bio}</p>
                <p>followers: {item.followersLength}</p>
                <p>following: {item.following}</p>
                {user.uid !== item.uid ? (
                  user && isFollowed ? (
                    <button onClick={() => unfollowUser(item.uid)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={() => followUser(item.uid)}>Follow</button>
                  )
                ) : null}
              </div>
            );
          })
        : null}
      <TweetsFeed tweetData={tweets} />
    </div>
  );
}

export default Profile;
