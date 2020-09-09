import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getUserByID } from '../../helpers/api-user';
import { defaultPicture } from '../../helpers/utils';
import './style.scss';

function Media({ userID }) {
  // Component State
  let [user, setUser] = useState({ name: '', profilePic: '', bio: '' });
  let [username, setUsername] = useState('');

  useEffect(() => {
    async function getUserData(userID) {
      return await getUserByID(userID);
    }
    (async function () {
      try {
        let res = await getUserData(userID);
        if (res === 404) {
          sessionStorage.removeItem('random_users');
          return;
        }
        if (typeof res != 'undefined') {
          setUser(
            res.additionalData
              ? res.additionalData
              : { name: '', profilePic: '', bio: '' }
          );
          setUsername(res.username);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userID]);

  return (
    <div className='user-media'>
      <Link to={`/${username}`}>
        <div className='img-container'>
          <div
            className='img'
            style={{
              backgroundImage: `url("${
                user.profilePic ? user.profilePic : defaultPicture
              }")`,
            }}
          ></div>
        </div>
      </Link>

      <div className='user-media-body'>
        <Link to={`/${username}`}>
          <h4 className='name'> {user.name} </h4>
        </Link>
        <small className='username'>@{username}</small>
        <div className='bio'>
          <p> {user.bio} </p>
        </div>
      </div>
    </div>
  );
}

export default Media;
