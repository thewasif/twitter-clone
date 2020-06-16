import React from "react";
import "./style.scss";
import Navigator from "../Navigator";
import SearchBox from "../SearchBox";

function Layout({ title, children }) {
  return (
    <div className="layout-container">
      <div className="nav-wraper">
        <Navigator />
      </div>
      <div className="main-content">
        <div>
          <h1>{title}</h1>
        </div>
        <div>{children}</div>
      </div>
      <div className="search-wraper">
        <SearchBox />
      </div>
    </div>
  );
}

export default Layout;
