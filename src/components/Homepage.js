import React, { useState } from "react";

function Homepage() {
  const [tweet, setTweet] = useState("");

  function handleInput(e) {
    setTweet(e.target.value);
  }

  function handleTweet(e) {
    e.preventDefault();
    console.log(tweet);
  }

  return <main>
    <form>
      <label>Create Tweet
        <input value={tweet} onChange={handleInput} />
      </label>
      <button onClick={handleTweet} >Tweet</button>
    </form>
  </main>;
}

export default Homepage;
