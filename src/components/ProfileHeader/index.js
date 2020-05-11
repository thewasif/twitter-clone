import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../helpers/api-user";
import "./style.scss";

const ProfileHeader = (props) => {
  let {
    name,
    username,
    bio,
    website,
    location,
    dob,
    joined,
    profilePhoto,
    coverPhoto,
    editable,
  } = props;
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
  let auth = isAuthenticated();

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
            ) : null}
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
          </div>
          <hr />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileHeader;
