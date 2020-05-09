import React from "react";
import "./style.scss";

function Tweet(props) {
  let { name, username, pic, time, hearts, replies, retweets, text } = props;
  return (
    <div className="tweet">
      <div className="photo-container">
        <div
          className="photo"
          style={{
            backgroundImage: `url('${pic}')`,
          }}
        ></div>
      </div>
      <div className="details">
        <div className="upper-layer">
          <h4>{name}</h4>
          <small>@{username}</small>
          <small>• {time}</small>
        </div>
        <div className="main-text">{text}</div>
        <div className="tweet-buttons">
          <button className="tweet-btn reply">
            <i className="far fa-comment-dots"></i>
            <span>{replies === 0 ? null : replies}</span>
          </button>
          <button className="tweet-btn heart">
            <i className="far fa-heart"></i>{" "}
            <span>{hearts === 0 ? null : hearts}</span>
          </button>
          <button className="tweet-btn retweet">
            <i className="fa fa-retweet"></i>{" "}
            <span>{retweets === 0 ? null : retweets}</span>
          </button>
          <button className="tweet-btn share">
            <i className="fa fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
