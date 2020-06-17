import React from "react";
import "./style.scss";
import Navigator from "../Navigator";
import SearchBox from "../SearchBox";
import { useHistory } from "react-router-dom";

function Layout({ title, children }) {
  let history = useHistory();

  return (
    <div className="layout-container">
      <div className="nav-wraper">
        <Navigator />
      </div>
      <div className="main-content">
        <div className="title">
          <button onClick={() => history.goBack()} hidden={title === "Home"}>
            <i className="fa fa-arrow-left"></i>
          </button>
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
