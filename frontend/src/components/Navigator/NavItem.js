import React from "react";
import "./style.scss";

const NavItem = (props) => {
  let { text, icon } = props;
  return (
    <div className="nav-item">
      <div className="icon">{icon}</div>
      <h1 className="text">{text}</h1>
    </div>
  );
};

export default NavItem;
