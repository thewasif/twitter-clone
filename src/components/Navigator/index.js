import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import "./style.scss";

const Navigator = (props) => {
  //let username = localStorage.getItem("username");
  return (
    <div className="nav-container">
      <Link to="/">
        <div className="logo-icon">
          <i className="fab fa-twitter title-icon"></i>
        </div>
      </Link>
      <div className="nav-content">
        <NavItem text="Home" icon={<i className="fa fa-home"></i>} />
        <NavItem text="Notifications" icon={<i className="far fa-bell"></i>} />
        <NavItem text="Bookmarks" icon={<i className="far fa-bookmark"></i>} />
        <Link to="/">
          <NavItem
            text="Profile"
            icon={<i className="far fa-user-circle"></i>}
          />
        </Link>
        <NavItem text="More" icon={<i className="fa fa-ellipsis-h"></i>} />
      </div>
      <div>
        <button className="btn-tweet">Tweet</button>
      </div>
    </div>
  );
};

export default Navigator;
