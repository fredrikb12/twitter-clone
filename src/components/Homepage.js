import { collection, getDocs, query, where } from "firebase/firestore";
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

function Homepage() {
  const [user] = useOutletContext();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function loadTweets() {
      const usersRef = collection(getDB(), "users");
      const q = query(usersRef, where("followers", "array-contains", user.uid));

      const qSnap = await getDocs(q);
      qSnap.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().tweets);
      });
    }
    loadTweets();
  }, [user.uid]);

  return (
    <StyledHomepageContainer>
      <StyledLeftSidebar></StyledLeftSidebar>
      <StyledMainContainer>
        <div>
          <CreateTweet />
          <SignOut />
        </div>
      </StyledMainContainer>
      <StyledRightSidebar></StyledRightSidebar>
    </StyledHomepageContainer>
  );
}

export default Homepage;
