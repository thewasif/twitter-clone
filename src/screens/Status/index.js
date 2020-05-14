import React, { useState, useEffect } from "react";
import { getTweet } from "../../helpers/api-tweet";

function Status(props) {
  let user = props.match.params.user,
    id = props.match.params.id;

  useEffect(() => {
    async function fetchData() {
      let tweet = await getTweet(id);
      console.log(tweet);
    }

    fetchData();
  }, []);
  return (
    <div>
      <h1>Hello! {id}</h1>
    </div>
  );
}

export default Status;
