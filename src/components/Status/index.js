import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { formattedDate } from "../../helpers/utils";
import { getTweet, actions } from "../../helpers/api-tweet";
import { isAuthenticated } from "../../helpers/api-user";

function Status(props) {
  let [liked, setLiked] = useState(false);

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
      let user = await isAuthenticated();

      if (res.hearts.includes(user._id)) {
        setLiked(true);
      }
    }

    getTweetData();
  }, [id]);
  let to = `/${username}`;

  return (
    <div className="status">
      <div className="media">
        <div
          className="media-photo"
          style={{ backgroundImage: `url("${pic}")` }}
        ></div>
        <div className="media-body">
          <Link to={to}>
            <h3>{name}</h3>
          </Link>
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
        <p onClick={props.onLikesClick}>
          <span>{hearts}</span> likes
        </p>
      </div>
      <div className="status-details">
        <div className="tweet-buttons">
          <button className="tweet-btn reply" onClick={props.onReplyClick}>
            <i className="far fa-comment-dots"></i>
          </button>
          <button
            className="tweet-btn heart"
            onClick={
              liked
                ? () => {
                    setLiked(false);
                    actions.unlike(id);
                  }
                : () => {
                    setLiked(true);
                    actions.like(id);
                  }
            }
          >
            {liked ? (
              <i className="fas fa-heart" style={{ color: "red" }}></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
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
