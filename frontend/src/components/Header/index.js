import React from "react";
import "./style.scss";

const Header = (props) => {
  return (
    <div className="header">
      <div className="icon-container">
        <i className="fab fa-twitter icon"></i>
      </div>
      <div className="heading">
        <h1>Twitter - Discover What's Happening!</h1>
      </div>
      <div className="extra-link">
        <a href="#">Another Link</a>
      </div>
    </div>
  );
};

export default Header;
