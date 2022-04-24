import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getDB } from "../firebase";
import useWindowWidth from "../getWindowWidth";
import CreateTweet from "./CreateTweet";
import Search from "./Search";
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
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowWidth();

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
      setIsLoading(() => true);
    }
    loadTweets();
  }, [user.uid]);

  return (
    <>
      <div>
        <div style={{ maxWidth: "100%", position: "relative" }}>
          {width < 841 && <Search />}
        </div>
        <CreateTweet />
      </div>
      <TweetsFeed tweetData={tweets} isLoading={isLoading} />
    </>
  );
}

export default Homepage;
