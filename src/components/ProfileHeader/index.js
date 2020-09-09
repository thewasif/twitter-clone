import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';
import { AiOutlineLink, AiOutlineCalendar } from 'react-icons/ai';
import { BiCake } from 'react-icons/bi';
import { getUser, actions } from '../../helpers/api-user';
import { formattedDate, USER_ID } from '../../helpers/utils';
import Modal from '../Modal';
import './style.scss';

function ProfileHeader(props) {
  // props variables
  let {
    name,
    username,
    userID,
    bio,
    website,
    location,
    dob,
    joined,
    profilePhoto,
    coverPhoto,
    editable,
    followers,
    following,
  } = props;

  // component State
  let [followed, setFollowed] = useState(false);
  let [modal, setModal] = useState(false);
  let [modalData, setModalData] = useState('followers');
  let [followCount, setFollowCount] = useState({
    followers: followers.length,
    following: following.length,
  });

  useEffect(() => {
    async function user() {
      let user = await getUser(String(username.split('@')[1]));
      if (user.followers.includes(USER_ID)) {
        setFollowed(true);
      }
    }

    user();
  }, [username]);

  let formated_dob =
    dob !== '' ? String(new Date(String(dob))).split(' ') : null;
  let dobObj = formated_dob
    ? {
        date: formated_dob[2],
        month: formated_dob[1],
        year: formated_dob[3],
      }
    : null;

  let formated_joined = formattedDate(joined);

  return (
    <React.Fragment>
      <div className='profile-header'>
        <div
          className='cover-photo'
          style={{ backgroundImage: "url('" + coverPhoto + "')" }}
        ></div>
        <div className='profile-section'>
          <div className='upper'>
            <div
              className='profile-photo'
              style={{ backgroundImage: "url('" + profilePhoto + "')" }}
            ></div>
            {editable ? (
              <div className='btn-container'>
                <Link to='/flow/setup'>
                  <button>Edit Profile</button>
                </Link>
              </div>
            ) : (
              <div className='btn-container'>
                {USER_ID ? (
                  <button
                    style={
                      followed ? { color: 'white', background: '#00abee' } : {}
                    }
                    onClick={
                      followed
                        ? () => {
                            setFollowed(false);
                            setFollowCount({
                              followers: followCount.followers - 1,
                              following: following.length,
                            });
                            actions.unfollow(userID);
                            sessionStorage.removeItem('feed_tweets');
                          }
                        : () => {
                            setFollowed(true);
                            setFollowCount({
                              followers: followCount.followers + 1,
                              following: following.length,
                            });
                            sessionStorage.removeItem('feed_tweets');

                            actions.follow(userID);
                          }
                    }
                  >
                    {followed ? 'Following' : 'Follow'}
                  </button>
                ) : null}
              </div>
            )}
          </div>
          <div className='profile-details'>
            <div className='head'>
              <h3 className='name-title'>{name}</h3>
              <small className='username-title'> {username} </small>
              <p className='bio'>{bio}</p>
            </div>
            <div className='extra-details'>
              {location !== '' ? (
                <div className='item'>
                  <GoLocation className='fa fa-map-marker' />
                  {location}
                </div>
              ) : null}

              {website !== '' ? (
                <div className='item'>
                  <AiOutlineLink className='fa fa-link' />
                  <a href={website} target='_blank' rel='noopener noreferrer'>
                    {website}
                  </a>
                </div>
              ) : null}

              {dobObj ? (
                <div className='item'>
                  <BiCake className='fa fa-birthday-cake' />
                  Born {`${dobObj.month} ${dobObj.date}, ${dobObj.year}`}
                </div>
              ) : null}

              <div className='item'>
                <AiOutlineCalendar className='fa fa-calendar-day' />
                Joined {`${formated_joined.month} ${formated_joined.year}`}
              </div>
            </div>
            <div className='follow-section'>
              <p
                onClick={() => {
                  setModalData('followers');
                  setModal(!modal);
                }}
              >
                <span> {followCount.followers} </span> Followers
              </p>
              <p
                onClick={() => {
                  setModalData('following');
                  setModal(!modal);
                }}
              >
                <span> {followCount.following} </span> Following
              </p>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <Modal
        visible={modal}
        users={modalData === 'followers' ? followers : following}
        onClose={() => {
          setModal(!modal);
        }}
      />
    </React.Fragment>
  );
}

export default ProfileHeader;
