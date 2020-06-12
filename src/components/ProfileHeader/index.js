import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, getUser, actions } from "../../helpers/api-user";
import { formattedDate } from "../../helpers/utils";
import Modal from "../Modal";
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
  let [modal, setModal] = useState(false);
  let [modalData, setModalData] = useState("followers");

  useEffect(() => {
    async function user() {
      let user = await getUser(String(username.split("@")[1]));
      let auth = await isAuthenticated();
      if (user.followers.includes(auth._id)) {
        setFollowed(true);
      }
    }

    user();
  }, [username]);

  let formated_dob =
    dob !== "" ? String(new Date(String(dob))).split(" ") : null;
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
                Joined {`${formated_joined.month} ${formated_joined.year}`}
              </div>
            </div>
            <div className="follow-section">
              <p
                onClick={() => {
                  setModalData("followers");
                  setModal(!modal);
                }}
              >
                <span> {followers.length} </span> Followers
              </p>
              <p
                onClick={() => {
                  setModalData("following");
                  setModal(!modal);
                }}
              >
                <span> {following.length} </span> Following
              </p>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <Modal
        visible={modal}
        users={modalData === "followers" ? followers : following}
        onClose={() => {
          setModal(!modal);
        }}
      />
    </React.Fragment>
  );
}

export default ProfileHeader;
