import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getNotifications } from "../../helpers/api-notifications";
import WelcomeMessage from "../../screens/Welcome/WelcomeMessage";
import NavItem from "./NavItem";
import Menu from "../Menu";
import "./style.scss";
import { GlobalContext } from "../../context/GlobalContext";
import { USER_ID } from "../../helpers/utils";

function Navigator(props) {
  let username = localStorage.getItem("username"),
    profileURL = `/${username}`;

  let { state, changeStyles } = useContext(GlobalContext);
  let [newNot, setNewNot] = useState(false);
  let [menu, setMenu] = useState("hidden");

  useEffect(() => {
    (async function () {
      if (USER_ID) {
        let data = await getNotifications();
        for (let notification of data) {
          if (!notification.read) {
            setNewNot(true);
            break;
          }
        }
      }
    })();
  });
  if (!USER_ID) {
    return <WelcomeMessage />;
  }
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
        <Link to={profileURL}>
          <NavItem
            text="Profile"
            icon={<i className="far fa-user-circle"></i>}
          />
        </Link>
        <Link to="/i/search" hidden={!(window.innerWidth < 420)}>
          <NavItem text="Search" icon={<i className="fa fa-search"></i>} />
        </Link>
        <div
          className="nav-item"
          onClick={() => setMenu(menu === "visible" ? "hidden" : "visible")}
        >
          <div className="icon">
            <i className="fa fa-ellipsis-h"></i>
          </div>
          <h1 className="text">{"More"}</h1>
        </div>
        <Menu visibility={menu} />
      </div>
    </div>
  );
}

export default Navigator;
