import React, { useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { formattedDate, JWT_TOKEN, SERVER } from "../../helpers/utils";

function Notification(props) {
  // prop variables
  let { text, username, link, time, read, id } = props;

  useEffect(() => {
    async function setRead(notificationID) {
      let data = { notificationID: notificationID };
      fetch(`${SERVER}/api/notifications/setread`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JWT_TOKEN.token,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        res.json().then((e) => {});
      });
    }
    if (!read) setRead(id);
  }, [id, read]);

  let date = formattedDate(time);

  return (
    <Link to={link}>
      <div
        className="notification-container"
        style={read ? {} : { backgroundColor: "#33b5e5", color: "white" }}
      >
        <i className="far fa-bell"></i>
        <p className="text">
          <span>@{username}</span> {text}
        </p>
        <p className="time">{date.time}</p>
      </div>
    </Link>
  );
}

export default Notification;
