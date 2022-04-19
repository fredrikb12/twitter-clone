import React from "react";
import { useOutletContext } from "react-router-dom";

function UserInfo({ userInfo, isFollowed, unfollowUser, followUser }) {
  const [user] = useOutletContext();

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
    </div>
  );
}

export default UserInfo;
