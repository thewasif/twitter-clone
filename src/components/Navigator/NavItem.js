import React from "react";
import "./style.scss";

const NavItem = (props) => {
  let { text, icon, badge } = props;
  return (
    <div className="nav-item">
      <div className="icon">{icon}</div>
      <h1 className="text">{text}</h1>
      <div className="badge" hidden={!badge}></div>
    </div>
  );
};

export default NavItem;
