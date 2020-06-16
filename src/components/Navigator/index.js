import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import "./style.scss";

const Navigator = (props) => {
  let username = localStorage.getItem("username"),
    profileURL = `/${username}`;
  return (
    <div className="nav-container">
      <Link to="/">
        <div className="logo-icon">
          <i className="fab fa-twitter title-icon"></i>
        </div>
      </Link>
      <div className="nav-content">
        <Link to="/">
          <NavItem text="Home" icon={<i className="fa fa-home"></i>} />
        </Link>
        <Link to={`/i/notifications`}>
          <NavItem
            text="Notifications"
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
};

export default Navigator;
