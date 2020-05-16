import React from "react";
import "./style.scss";

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

  let date = String(new Date(time)).split(" ");

  let day = date[0],
    month = date[1],
    dat = date[2],
    year = date[3],
    clock = date[4].substring(0, 5);

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
        <p className="date">{`${clock} • ${month} ${dat}, ${year} • Twitter Web App`}</p>
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
