import React from "react";
import { useOutletContext } from "react-router-dom";
import Button from "./Button";
import StyledFlexRowContainer from "./styled/StyledFlexRowContainer";

function UserInfo({ userInfo, isFollowed, unfollowUser, followUser }) {
  const [user] = useOutletContext();

  return (
    <div>
      {userInfo[0]
        ? userInfo.map((item, index) => {
            if (index > 0) return null;
            return (
              <div key={index}>
                <h1 style={{ fontSize: "1.8rem" }}>{item.displayName}</h1>
                <p>{item.bio}</p>
                <StyledFlexRowContainer
                  style={{
                    gap: "10px",
                    fontSize: "0.95rem",
                    padding: "8px 0",
                  }}
                >
                  <p>followers: {item.followersLength}</p>
                  <p>following: {item.following}</p>
                </StyledFlexRowContainer>
                {user.uid !== item.uid ? (
                  user && isFollowed ? (
                    <Button
                      text={"Unfollow"}
                      onClick={() => unfollowUser(item.uid)}
                    />
                  ) : (
                    <Button
                      text={"Follow"}
                      onClick={() => followUser(item.uid)}
                    />
                  )
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default UserInfo;
