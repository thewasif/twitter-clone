import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { formattedDate } from "../../helpers/utils";
import { getUserByID } from "../../helpers/api-user";
import "./style.scss";

function Tweet(props) {
  //Component State
  let [userData, setUserData] = useState({});

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
    userID,
  } = props;
  let history = useHistory();
  let goToTweet = () => {
    history.push(`/status/${id}`);
  };
  let date = formattedDate(time);

  useEffect(() => {
    async function setUser() {
      let user = await getUserByID(userID);
      setUserData(user.additionalData);

      console.log(userData);
    }
    setUser();
  }, []);

  return (
    <div className="tweet">
      <div className="photo-container">
        <div
          className="photo"
          style={{
            backgroundImage: `url('${userData.profilePic}')`,
          }}
        ></div>
      </div>
      <div className="details">
        <div className="upper-layer">
          <h4>{userData.name}</h4>
          <small>@{username}</small>
          <small>
            • {date.month} {date.date}
          </small>
        </div>
        <div className="main-text" onClick={goToTweet}>
          {text}
        </div>
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
