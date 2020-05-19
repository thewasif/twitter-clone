import React, { useEffect, useState } from "react";
import { getTweet } from "../../helpers/api-tweet";
import { getUserByID } from "../../helpers/api-user";
import { Navigator, Status as StatusComponent, Loader } from "../../components";
import "./style.scss";

function Status(props) {
  let id = props.match.params.id;

  // Component State
  let [tweetData, setTweetData] = useState({});
  let [userDate, setUserData] = useState({});
  let [loading, setLoadingState] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let tweet = await getTweet(id);
      let user = await getUserByID(tweet.userID);
      setTweetData(tweet);
      setUserData(user);
      setLoadingState(false);
    }

    fetchData();
  }, []);
  return (
    <div className="app-container">
      <div className="section">
        <Navigator />
      </div>
      <div className="section">
        <div className="title-container">
          <h1 className="title">Tweet</h1>
        </div>
        <div className="tweet-box-container">
          {loading ? (
            <Loader />
          ) : (
            <StatusComponent
              text={tweetData.text}
              username={userDate.username}
              name={userDate.additionalData.name}
              time={tweetData.time}
              pic={userDate.additionalData.profilePic}
              hearts={tweetData.hearts.length}
              id={tweetData._id}
            />
          )}
        </div>
      </div>
      <div className="section">sec 3</div>
    </div>
  );
}

export default Status;
