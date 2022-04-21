import React, { useEffect, useState } from "react";
import profilePic from "../images/profile.svg";
import homePic from "../images/home.svg";
import settingsPic from "../images/settings.svg";
import { Link, useOutletContext } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getDB } from "../firebase";
import StyledLeftSidebar from "./styled/StyledLeftSidebar";
import SignOut from "./SignOut";
import { RoundedImage } from "./styled/RoundedImage";
import { UserInfoBox } from "./styled/UserInfoBox.styled";
import Circle3DSpinLoader from "./Circle3DSpinLoader";

function LeftSidebar({ user }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(getDB(), "users", user.uid), (doc) => {
      setUserInfo(() => {
        return { ...doc.data() };
      });
    });
    /* async function getUserInfo() {
      const userRef = doc(getDB(), "users", user.uid);
      const data = await getDoc(userRef);
      setUserInfo(() => {
        return { ...data.data() };
      });
    }
    getUserInfo();*/
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return userInfo ? (
    <StyledLeftSidebar>
      <nav>
        <ul style={{ listStyle: "none" }}>
          <li>
            <Link to={`/`}>
              <img style={{ width: "40px" }} src={homePic} alt={"home"} />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to={userInfo.tag ? `/profiles/${userInfo.tag}` : "/"}>
              <img style={{ width: "40px" }} src={profilePic} alt={"profile"} />
              <p>Profile</p>
            </Link>
          </li>
          <li>
            <Link to={"/settings"}>
              <img
                style={{ width: "40px" }}
                src={settingsPic}
                alt={"settings"}
              />
              <p>Settings</p>
            </Link>
          </li>
        </ul>
      </nav>
      <UserInfoBox>
        <div>
          <Link to={`/profiles/${userInfo.tag}`}>
            {userInfo.photoURL ? <RoundedImage
              style={{ width: "40px" }}
              src={userInfo.photoURL}
              alt={"user"}
            /> : <Circle3DSpinLoader/> }

            <p>{userInfo.displayName}</p>
          </Link>
        </div>
        <SignOut user={user} />
      </UserInfoBox>
    </StyledLeftSidebar>
  ) : null;
}

export default LeftSidebar;
