import React, { useState } from "react";
import "./style.scss";
import Loader from "../Loader";
import { postTweet } from "../../helpers/api-tweet";
import notify from "../Notify";

const TweetBox = (props) => {
  // props variables
  let { profile_pic } = props;

  // Component State
  let [tweetText, setTweetText] = useState("");
  let [loading, setLoading] = useState(false);

  return (
    <div className="tweet-box">
      <div className="col-1">
        <div
          className="avatar"
          style={{
            backgroundImage: `url('${profile_pic}')`,
          }}
        ></div>
      </div>
      <div className="col-2">
        <div className="form">
          <form>
            <textarea
              rows="1"
              type="text"
              placeholder="What's happening?"
              name="tweetText"
              className="tweet-box"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
          </form>
        </div>
        <div className="options">
          <div className="group-icons">
            <button className="btn-icon">
              <i className="far fa-smile"></i>
            </button>
          </div>
          <button
            className="tweet-btn"
            disabled={tweetText === ""}
            onClick={() => {
              setLoading(true);
              postTweet(
                tweetText,
                JSON.parse(localStorage.getItem("JWT_TOKEN"))
              ).then((res) => {
                if (res.status === 200) {
                  setLoading(false);
                  setTweetText("");
                  notify("Tweet posted successfully..!");
                } else {
                  setLoading(false);
                  notify("An error occurred..!");
                }
              });
            }}
          >
            {loading ? <Loader inverted={true} /> : "Tweet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
