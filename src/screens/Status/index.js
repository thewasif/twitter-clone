import React, { useEffect, useState } from "react";
import { getTweet, getReplies } from "../../helpers/api-tweet";
import { getUserByID } from "../../helpers/api-user";
import {
  Navigator,
  Status as StatusComponent,
  Loader,
  TweetModel,
  Tweet,
} from "../../components";
import "./style.scss";

function Status(props) {
  // Component State
  let [tweetData, setTweetData] = useState({});
  let [replies, setReplies] = useState([]);
  let [userDate, setUserData] = useState({});
  let [loading, setLoadingState] = useState(true);
  let [modelVisibility, setModelVisibility] = useState(false);
  let [id, setID] = useState(props.match.params.id);

  useEffect(() => {
    async function fetchData() {
      let tweet = await getTweet(id);
      let user = await getUserByID(tweet.userID);
      setTweetData(tweet);
      setUserData(user);
      setLoadingState(false);
    }

    async function fetchReplies() {
      let fetchedReplies = await getReplies(
        id,
        JSON.parse(localStorage.getItem("JWT_TOKEN"))
      );
      let parsedData = await fetchedReplies.json();
      setReplies(parsedData);
    }

    fetchData().then(() => {
      fetchReplies();
    });
  }, [id]);

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
            <React.Fragment>
              <TweetModel
                visible={modelVisibility}
                image={userDate.additionalData.profilePic}
                orgTweetID={id}
                onClose={() => {
                  setModelVisibility(!modelVisibility);
                }}
              />
              <StatusComponent
                text={tweetData.text}
                username={userDate.username}
                name={userDate.additionalData.name}
                time={tweetData.time}
                pic={userDate.additionalData.profilePic}
                hearts={tweetData.hearts.length}
                id={tweetData._id}
                onReplyClick={() => {
                  setModelVisibility(!modelVisibility);
                }}
              />
              {replies.map((reply) => {
                return (
                  <Tweet
                    key={reply.text}
                    text={reply.text}
                    hearts={reply.hearts}
                    replies={reply.replies.length}
                    retweets={reply.retweets.length}
                    time={reply.time}
                    id={reply._id}
                    userID={reply.userID}
                    onClick={() => {
                      setLoadingState(true);
                      setID(reply._id);
                    }}
                  />
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="section">sec 3</div>
    </div>
  );
}

export default Status;
