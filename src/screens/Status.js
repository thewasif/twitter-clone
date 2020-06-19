import React, { useEffect, useState } from "react";
import { getTweet, getReplies } from "../helpers/api-tweet";
import { ToastContainer } from "react-toastify";
import { getUserByID } from "../helpers/api-user";
import { flexCenter, USER_ID } from "../helpers/utils";
import "react-toastify/dist/ReactToastify.css";
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
      if (USER_ID) {
        let fetchedReplies = await getReplies(
          id,
          JSON.parse(localStorage.getItem("JWT_TOKEN"))
        );
        let parsedData = await fetchedReplies.json();
        console.log(parsedData);
        setReplies(parsedData);
      }
    }

    fetchData().then(() => {
      fetchReplies();
    });
  }, [id]);

  let repliesJSX = replies.map((reply) => {
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
        onReplyClick={() => {
          setID(reply._id);
          setModelVisibility(!modelVisibility);
        }}
      />
    );
  });

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
                if (USER_ID) {
                  setModelVisibility(!modelVisibility);
                } else {
                  alert("Please login first!");
                }
              }}
            />
            {repliesJSX.length === 0 ? (
              loading ? (
                <Loader />
              ) : (
                <h3 style={{ textAlign: "center", fontFamily: "Open Sans" }}>
                  No replies
                </h3>
              )
            ) : (
              repliesJSX
            )}
          </React.Fragment>
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover={false}
      />
    </Layout>
  );
}

export default Status;
