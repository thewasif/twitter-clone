import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, getUser, actions } from "../../helpers/api-user";
import "./style.scss";

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

  useEffect(() => {
    async function user(params) {
      console.log(String(username.split("@")[1]));
      let user = await getUser(String(username.split("@")[1]));
      let auth = await isAuthenticated();
      console.log(user);
      console.log(auth);
      if (user.followers.includes(auth._id)) {
        console.log("Already followed..!");
        setFollowed(true);
      }
    }

    user();
  }, []);

  let formated_dob =
    dob !== "" ? String(new Date(String(dob))).split(" ") : null;
  let dobObj = formated_dob
    ? {
        date: formated_dob[2],
        month: formated_dob[1],
        year: formated_dob[3],
      }
    : null;
  let formated_joined = String(new Date(String(joined))).split(" ");
  let joinedObj = {
    date: formated_joined[2],
    month: formated_joined[1],
    year: formated_joined[3],
  };

  return (
    <React.Fragment>
      <div className="title-bar">
        <i className="fa fa-arrow-left"></i>
        <h3>{name}</h3>
      </div>
      <div className="profile-header">
        <div
          className="cover-photo"
          style={{ backgroundImage: "url('" + coverPhoto + "')" }}
        ></div>
        <div className="profile-section">
          <div className="upper">
            <div
              className="profile-photo"
              style={{ backgroundImage: "url('" + profilePhoto + "')" }}
            ></div>
            {editable ? (
              <div className="btn-container">
                <Link to="/flow/setup">
                  <button>Edit Profile</button>
                </Link>
              </div>
            ) : (
              <div className="btn-container">
                <button
                  style={
                    followed ? { color: "white", background: "#00abee" } : {}
                  }
                  onClick={
                    followed
                      ? () => {
                          setFollowed(false);
                          actions.unfollow(userID);
                        }
                      : () => {
                          setFollowed(true);
                          actions.follow(userID);
                        }
                  }
                >
                  {followed ? "Following" : "Follow"}
                </button>
              </div>
            )}
          </div>
          <div className="profile-details">
            <div className="head">
              <h3 className="name-title">{name}</h3>
              <small className="username-title"> {username} </small>
              <p className="bio">{bio}</p>
            </div>
            <div className="extra-details">
              {location !== "" ? (
                <div className="item">
                  <i className="fa fa-map-marker"></i>
                  {location}
                </div>
              ) : null}

              {website !== "" ? (
                <div className="item">
                  <i className="fa fa-link"></i>
                  {website}
                </div>
              ) : null}

              {dobObj ? (
                <div className="item">
                  <i className="fa fa-birthday-cake"></i>
                  Born {`${dobObj.month} ${dobObj.date}, ${dobObj.year}`}
                </div>
              ) : null}

              <div className="item">
                <i className="fa fa-calendar-day"></i>
                Joined {`${joinedObj.month} ${joinedObj.year}`}
              </div>
            </div>
            <div className="follow-section">
              <p>
                <span> {followers} </span> Followers
              </p>
              <p>
                <span> {following} </span> Following
              </p>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfileHeader;
