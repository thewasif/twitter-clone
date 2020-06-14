import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function Notification(props) {
  // prop variables
  let { text, username, link } = props;
  return (
    <Link to={link}>
      <div className="notification-container">
        <i className="far fa-bell"></i>
        <p>
          <span>@{username}</span> {text}
        </p>
      </div>
    </Link>
  );
}

export default Notification;
