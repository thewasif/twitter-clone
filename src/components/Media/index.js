import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserByID } from "../../helpers/api-user";
import "./style.scss";

function Media({ userID }) {
  // Component State
  let [user, setUser] = useState({});
  let [username, setUsername] = useState("");

  useEffect(() => {
    async function getUserData(userID) {
      return await getUserByID(userID);
    }

    getUserData(userID).then((res) => {
      console.log(res.additionalData);
      setUser(res.additionalData);
      setUsername(res.username);
    });
  }, [userID]);

  return (
    <div className="user-media">
      <Link to={`/${username}`}>
        <div className="img-container">
          <div
            className="img"
            style={{
              backgroundImage: `url("${user.profilePic}")`,
            }}
          ></div>
        </div>
      </Link>

      <div className="user-media-body">
        <Link to={`/${username}`}>
          <h4 className="name"> {user.name} </h4>
        </Link>
        <small className="username">@{username}</small>
        <div className="bio">
          <p> {user.bio} </p>
        </div>
      </div>
    </div>
  );
}

export default Media;
