import React, { useEffect } from "react";
import "./style.scss";
import { formattedDate } from "../../helpers/utils";
import { getTweet } from "../../helpers/api-tweet";

function Status(props) {
  let {
    name,
    username,
    pic,
    time,
    hearts,
    replies,
    retweets,
    text,
    id,
  } = props;
  let date = formattedDate(time);

  useEffect(() => {
    async function getTweetData() {
      let res = await getTweet(id);

      if (res.hearts.includes(res.userID)) {
        console.log("YOU HAVE LIKED THIS");
      }
    }

    getTweetData();
  }, []);

  async function postLike(tweetID) {
    let data = { tweetID: tweetID },
      tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    fetch("http://localhost:5000/api/tweet/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenObj.token,
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <div className="status">
      <div className="media">
        <div
          className="media-photo"
          style={{ backgroundImage: `url("${pic}")` }}
        ></div>
        <div className="media-body">
          <h3>{name}</h3>
          <p>@{username}</p>
        </div>
        <div className="icon-button">
          <i className="fa fa-ellipsis-h"></i>
        </div>
      </div>

      <div className="status-text">
        <p className="text">{text}</p>
        <p className="date">{`${date.time} • ${date.month} ${date.date}, ${date.year} • Twitter Web App`}</p>
      </div>

      <div className="status-details">
        <p>
          <span>{hearts}</span> likes
        </p>
      </div>
      <div className="status-details">
        <div className="tweet-buttons">
          <button className="tweet-btn reply">
            <i className="far fa-comment-dots"></i>
          </button>
          <button className="tweet-btn heart">
            <i className="far fa-heart"></i>{" "}
          </button>
          <button className="tweet-btn retweet">
            <i className="fa fa-retweet"></i>{" "}
          </button>
          <button className="tweet-btn share">
            <i className="fa fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Status;
