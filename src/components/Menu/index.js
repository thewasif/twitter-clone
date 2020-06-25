import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function Menu({ visibility }) {
  return (
    <div className="menu" style={{ visibility: visibility }}>
      <div>
        <Link to="/flow/logout">
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
