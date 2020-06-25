import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Modal from "../Modal";
import { actions } from "../../helpers/api-tweet";
import { isAuthenticated } from "../../helpers/api-user";
import { USER_ID, formattedDate } from "../../helpers/utils";
import notify from "../Notify";

function Status(props) {
  // props variables
  let { name, username, pic, time, hearts, text, id } = props;

  // component state
  let [liked, setLiked] = useState(false);
  let [likesCount, setLikesCount] = useState(hearts.length);
  let [modal, setModal] = useState(false);

  let date = formattedDate(time);

  useEffect(() => {
    async function getTweetData() {
      let user = await isAuthenticated();
      if (hearts.includes(user._id)) {
        setLiked(true);
      }
    }

    getTweetData();
  }, [hearts]);

  let to = `/${username}`;

  return (
    <div className="status">
      <Modal
        visible={modal}
        users={hearts}
        onClose={() => {
          setModal(!modal);
        }}
      />
      <div className="media">
        <Link to={to}>
          <div
            className="media-photo"
            style={{ backgroundImage: `url("${pic}")` }}
          ></div>
        </Link>
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
        <p onClick={() => setModal(!modal)}>
          <span>{likesCount}</span> likes
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
                    setLikesCount(likesCount - 1);
                    hearts.pop(USER_ID);
                    actions.unlike(id);
                  }
                : () => {
                    if (USER_ID) {
                      setLiked(true);
                      setLikesCount(likesCount + 1);
                      hearts.push(USER_ID);
                      actions.like(id);
                    } else {
                      alert("Please login first!");
                    }
                  }
            }
          >
            {liked ? (
              <i className="fas fa-heart" style={{ color: "red" }}></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </button>

          <button
            className="tweet-btn share"
            onClick={() => {
              navigator.clipboard
                .writeText(`${window.location.hostname}/status/${id}`)
                .then(() => {
                  notify("Link copied..!");
                });
            }}
          >
            <i className="fa fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Status;
