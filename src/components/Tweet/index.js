import React, { useState, useEffect } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { BiShare } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { formattedDate, USER_ID, defaultPicture } from '../../helpers/utils';
import { getUserByID } from '../../helpers/api-user';
import { actions } from '../../helpers/api-tweet';
import notify from '../Notify';
import './style.scss';

function Tweet(props) {
  // props variables
  let { time, hearts, replies, text, id, userID } = props;

  //Component State
  let [userData, setUserData] = useState({});
  let [username, setUsername] = useState('');
  let [liked, setLiked] = useState(hearts.includes(USER_ID) ? true : false);
  let [likesCount, setLikesCount] = useState(hearts.length);

  let date = formattedDate(time);

  useEffect(() => {
    async function setUser() {
      let previousUser = JSON.parse(sessionStorage.getItem('previous_user'));
      if (previousUser) {
        if (previousUser._id === userID) {
          setUsername(previousUser.username);
          setUserData(previousUser.additionalData);
        } else {
          let user = await getUserByID(userID);

          setUsername(user.username);
          setUserData(user.additionalData);
          sessionStorage.setItem('previous_user', JSON.stringify(user));
        }
      } else {
        let user = await getUserByID(userID);
        setUsername(user.username);
        setUserData(user.additionalData);
        sessionStorage.setItem('previous_user', JSON.stringify(user));
      }
    }
    setUser();
  }, [userID]);
  let to = `/status/${id}`;

  return (
    <div className='tweet'>
      <div className='photo-container'>
        <Link to={`/${username}`}>
          <div
            className='photo'
            style={{
              backgroundImage: `url('${
                userData.profilePic === '' || userData.profilePic === undefined
                  ? defaultPicture
                  : userData.profilePic
              }')`,
            }}
          ></div>
        </Link>
      </div>
      <div className='details'>
        <div className='upper-layer'>
          <Link to={`/${username}`}>
            <h4>{userData.name}</h4>
          </Link>
          <small>@{username}</small>
          <small>
            • {date.month} {date.date}
          </small>
        </div>
        <div className='main-text' onClick={props.onClick}>
          <Link to={to}>{text}</Link>
        </div>
        <div className='tweet-buttons'>
          <button
            className='tweet-btn reply'
            onClick={
              USER_ID ? props.onReplyClick : () => alert('Please login first!')
            }
          >
            <FaRegComment className='fa fa-comment-dots' />
            <span>{replies === 0 ? null : replies}</span>
          </button>
          <button
            className='tweet-btn heart'
            onClick={
              liked
                ? () => {
                    setLiked(false);
                    setLikesCount(likesCount - 1);
                    actions.unlike(id);
                  }
                : () => {
                    if (USER_ID) {
                      setLiked(true);
                      setLikesCount(likesCount + 1);
                      actions.like(id);
                    } else {
                      alert('Please login first');
                    }
                  }
            }
          >
            {liked ? (
              <i style={{ color: 'red' }} className='fas fa-heart'></i>
            ) : (
              <i className='far fa-heart'></i>
            )}{' '}
            <span>{likesCount === 0 ? null : likesCount}</span>
          </button>

          <button
            className='tweet-btn share'
            onClick={() => {
              navigator.clipboard
                .writeText(`${window.location.hostname}/status/${id}`)
                .then(() => {
                  notify('Link copied..!');
                });
            }}
          >
            <BiShare className='fa fa-share' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
