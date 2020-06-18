import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formattedDate, USER_ID } from "../../helpers/utils";
import { getUserByID } from "../../helpers/api-user";
import { actions } from "../../helpers/api-tweet";
import "./style.scss";

function Tweet(props) {
  // props variables
  let { time, hearts, replies, retweets, text, id, userID } = props;

  //Component State
  let [userData, setUserData] = useState({});
  let [username, setUsername] = useState("");
  let [liked, setLiked] = useState(hearts.includes(USER_ID) ? true : false);
  let [likesCount, setLikesCount] = useState(hearts.length);

  let date = formattedDate(time);

  useEffect(() => {
    async function setUser() {
      let user = await getUserByID(userID);
      setUsername(user.username);
      setUserData(user.additionalData);
    }
    setUser();
  }, [userID]);

  let to = `/status/${id}`;

  return (
    <div className="tweet">
      <div className="photo-container">
        <Link to={`/${username}`}>
          <div
            className="photo"
            style={{
              backgroundImage: `url('${userData.profilePic}')`,
            }}
          ></div>
        </Link>
      </div>
      <div className="details">
        <div className="upper-layer">
          <Link to={`/${username}`}>
            <h4>{userData.name}</h4>
          </Link>
          <small>@{username}</small>
          <small>
            • {date.month} {date.date}
          </small>
        </div>
        <div className="main-text" onClick={props.onClick}>
          <Link to={to}>{text}</Link>
        </div>
        <div className="tweet-buttons">
          <button className="tweet-btn reply" onClick={props.onReplyClick}>
            <i className="far fa-comment-dots"></i>
            <span>{replies === 0 ? null : replies}</span>
          </button>
          <button
            className="tweet-btn heart"
            onClick={
              liked
                ? () => {
                    setLiked(false);
                    setLikesCount(likesCount - 1);
                    actions.unlike(id);
                  }
                : () => {
                    setLiked(true);
                    setLikesCount(likesCount + 1);
                    actions.like(id);
                  }
            }
          >
            {liked ? (
              <i style={{ color: "red" }} className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}{" "}
            <span>{likesCount === 0 ? null : likesCount}</span>
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
