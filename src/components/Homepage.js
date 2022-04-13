import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import SignOut from "./SignOut";

function Homepage() {
  const [user] = useOutletContext();
  const [tweet, setTweet] = useState("");

  function handleInput(e) {
    setTweet(e.target.value);
  }

  function handleTweet(e) {
    e.preventDefault();
    console.log(tweet);
  }

  return (
    <main>
      <form>
        <label>
          Create Tweet
          <textarea value={tweet} onChange={handleInput} />
        </label>
        <button onClick={handleTweet}>Tweet</button>
      </form>
      <SignOut />
    </main>
  );
}

export default Homepage;
