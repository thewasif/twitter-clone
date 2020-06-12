import React from "react";
import Tweet from "../Tweet";

function CompoundTweet(params) {
  return (
    <div>
      <Tweet />
      <Tweet />
    </div>
  );
}

export default CompoundTweet;
