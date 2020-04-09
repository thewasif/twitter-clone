import React from "react";
import NavItem from "./NavItem";
import "./style.scss";

const Navigator = (props) => {
  return (
    <div className="nav-container">
      <div className="logo-icon">
        <i className="fab fa-twitter title-icon"></i>
      </div>
      <div className="nav-content">
        <NavItem text="Home" icon={<i className="fa fa-home"></i>} />
        <NavItem text="Notifications" icon={<i className="far fa-bell"></i>} />
        <NavItem text="Bookmarks" icon={<i className="far fa-bookmark"></i>} />
        <NavItem text="Profile" icon={<i className="far fa-user-circle"></i>} />
        <NavItem text="More" icon={<i className="fa fa-ellipsis-h"></i>} />
      </div>
      <div>
        <button className="btn-tweet">Tweet</button>
      </div>
    </div>
  );
};

export default Navigator;
