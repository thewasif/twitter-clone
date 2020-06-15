import React, { useEffect, useState } from "react";
import "./style.scss";
import Media from "../Media";
import Loader from "../Loader";

function SearchBox(props) {
  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    async function fillUsers() {
      fetch("/api/user/randomuser").then((res) => {
        res.json().then((e) => {
          setUsers(e);
          setLoading(false);
        });
      });
    }

    fillUsers();
  }, []);

  return (
    <div className="search-container">
      <div className="input-container">
        <i className="fa fa-search"></i>
        <input type="text" className="input" placeholder="Search Twitter..." />
      </div>
      <div className="card-container">
        <div className="who-to-follow-card">
          <div className="header">
            <h3>Who to Follow</h3>
          </div>
          <div
            className="media-container"
            style={
              loading
                ? {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {}
            }
          >
            {loading ? (
              <Loader />
            ) : (
              users.map((user) => <Media userID={user._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
