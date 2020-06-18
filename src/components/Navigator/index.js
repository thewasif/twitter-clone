import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getNotifications } from "../../helpers/api-notifications";
import NavItem from "./NavItem";
import "./style.scss";
import { GlobalContext } from "../../context/GlobalContext";

function Navigator(props) {
  let username = localStorage.getItem("username"),
    profileURL = `/${username}`;

  let { state, changeStyles } = useContext(GlobalContext);
  let [newNot, setNewNot] = useState(false);

  useEffect(() => {
    (async function () {
      let data = await getNotifications();
      for (let notification of data) {
        if (!notification.read) {
          setNewNot(true);
          break;
        }
      }
    })();
  });

  return (
    <div className="nav-container" style={state.styles}>
      <div className="top-header">
        <Link to="/">
          <div className="logo-icon">
            <i className="fab fa-twitter title-icon"></i>
          </div>
        </Link>
        <div
          className="times"
          onClick={() => {
            changeStyles({ left: -300 });
          }}
          hidden={!(window.innerWidth < 420)}
        >
          <i className="fa fa-times"></i>
        </div>
      </div>
      <div className="nav-content">
        <Link to="/">
          <NavItem text="Home" icon={<i className="fa fa-home"></i>} />
        </Link>
        <Link to={`/i/notifications`}>
          <NavItem
            badge={newNot}
            text={"Notifications"}
            icon={<i className="far fa-bell"></i>}
          />
        </Link>
        <NavItem text="Bookmarks" icon={<i className="far fa-bookmark"></i>} />
        <Link to={profileURL}>
          <NavItem
            text="Profile"
            icon={<i className="far fa-user-circle"></i>}
          />
        </Link>
        <NavItem text="More" icon={<i className="fa fa-ellipsis-h"></i>} />
      </div>
    </div>
  );
}

export default Navigator;
