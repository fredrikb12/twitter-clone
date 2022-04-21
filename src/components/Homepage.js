import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getDB } from "../firebase";
import CreateTweet from "./CreateTweet";
import SignOut from "./SignOut";
import StyledFlexColContainer from "./styled/StyledFlexColContainer";
import StyledFlexRowContainer from "./styled/StyledFlexRowContainer";
import StyledHomepageContainer from "./styled/StyledHomepageContainer";
import StyledLeftSidebar from "./styled/StyledLeftSidebar";
import StyledMainContainer from "./styled/StyledMainContainer";
import StyledRightSidebar from "./styled/StyledRightSidebar";
import TweetsFeed from "./TweetsFeed";

function Homepage() {
  const [user] = useOutletContext();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    console.log("tweets: ", tweets);
  }, [tweets]);

  useEffect(() => {
    async function loadTweets() {
      const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("followers", "array-contains", user.uid));

      const qSnap = await getDocs(q);
      const tweetData = [];
      qSnap.forEach((doc) => {
        const tweets = doc
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
        const data = {};
        /*data.authorName = doc.data().displayName;
        data.userName = doc.data().tag;
        data.tweets = [...doc.data().tweets];
        console.log("data: ", data);*/
        console.log(doc.id, " => ", tweets);
        tweetData.push(...tweets);
      });
      setTweets(() => {
        return [...tweetData];
      });
    }
    loadTweets();
  }, [user.uid]);

  return (
    <>
      <div>
        <CreateTweet />
      </div>
      <TweetsFeed tweetData={tweets} />
    </>
  );
}

export default Homepage;
