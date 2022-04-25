import React, { useEffect, useState } from "react";
import profilePic from "../images/profile.svg";
import homePic from "../images/home.svg";
import settingsPic from "../images/settings.svg";
import { Link, NavLink } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { getDB } from "../firebase";
import StyledLeftSidebar from "./styled/StyledLeftSidebar";
import SignOut from "./SignOut";
import { RoundedImage } from "./styled/RoundedImage";
import { UserInfoBox } from "./styled/UserInfoBox.styled";
import Circle3DSpinLoader from "./Circle3DSpinLoader";
import useWindowWidth from "../getWindowWidth";
import Search from "./Search";

function LeftSidebar({ user }) {
  const [userInfo, setUserInfo] = useState({});
  const { width } = useWindowWidth();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(getDB(), "users", user.uid), (doc) => {
      setUserInfo(() => {
        return { ...doc.data() };
      });
    });
    return () => unsubscribe();
  }, [user]);

  return userInfo ? (
    <StyledLeftSidebar>
      <div>
        <nav>
          <ul style={{ listStyle: "none" }}>
            <li>
              <NavLink
                to={`/`}
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "none" };
                }}
              >
                <img style={{ width: "40px" }} src={homePic} alt={"home"} />
                <p>Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={userInfo.tag ? `/profiles/${userInfo.tag}` : "/"}
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "none" };
                }}
              >
                <img
                  style={{ width: "40px" }}
                  src={profilePic}
                  alt={"profile"}
                />
                <p>Profile</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/settings"}
                style={({ isActive }) => {
                  return { textDecoration: isActive ? "underline" : "none" };
                }}
              >
                <img
                  style={{ width: "40px" }}
                  src={settingsPic}
                  alt={"settings"}
                />
                <p>Settings</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {width < 1251 && width > 840 ? (
          <Search style={{ maxWidth: "100%", position: "relative" }} />
        ) : null}
      </div>
      <UserInfoBox>
        <div>
          <Link to={`/profiles/${userInfo.tag}`}>
            {userInfo.photoURL ? (
              <RoundedImage
                style={{ width: "40px" }}
                src={userInfo.photoURL}
                alt={"user"}
              />
            ) : (
              <Circle3DSpinLoader />
            )}

            <p>{userInfo.displayName}</p>
          </Link>
        </div>
        <SignOut user={user} />
      </UserInfoBox>
    </StyledLeftSidebar>
  ) : null;
}

export default LeftSidebar;
