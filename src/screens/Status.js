import React, { useEffect, useState } from "react";
import { getTweet, getReplies } from "../helpers/api-tweet";
import { getUserByID } from "../helpers/api-user";
import { flexCenter } from "../helpers/utils";
import {
  Status as StatusComponent,
  Loader,
  TweetModel,
  Tweet,
  Layout,
} from "../components";

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

  let repliesJSX =
    replies.length !== 0 ? (
      replies.map((reply) => {
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
      })
    ) : (
      <Loader />
    );

  return (
    <Layout title="Tweet">
      <div className="tweet-box-container" style={loading ? flexCenter : {}}>
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
              hearts={tweetData.hearts}
              id={tweetData._id}
              onReplyClick={() => {
                setModelVisibility(!modelVisibility);
              }}
            />
            {repliesJSX}
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
}

export default Status;
