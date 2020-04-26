import React from "react";
import "./style.scss";

const TweetBox = (props) => {
  let { profile_pic } = props;
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
            />
          </form>
        </div>
        <div className="options">
          <div className="group-icons">
            <button className="btn-icon">
              <i className="far fa-image"></i>
            </button>
            <button className="btn-icon">
              <i className="fa fa-poll"></i>
            </button>
            <button className="btn-icon">
              <i className="far fa-smile"></i>
            </button>
          </div>
          <button className="tweet-btn">Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
