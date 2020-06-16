import React, { useEffect, useState } from "react";
import "./style.scss";
import Media from "../Media";
import Loader from "../Loader";
import { search } from "../../helpers/api-tweet";

function SearchBox(props) {
  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);
  let [value, setValue] = useState([]);
  let [searchedUsers, setSearchedUsers] = useState(null);

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
  let suggestedUsers = loading ? (
    <Loader />
  ) : (
    users.map((user) => <Media key={user._id} userID={user._id} />)
  );

  let searchedUsersJSX = loading ? (
    <Loader />
  ) : searchedUsers ? (
    searchedUsers.map((user) => <Media key={user._id} userID={user._id} />)
  ) : null;
  console.log(searchedUsersJSX);
  return (
    <div className="search-container">
      <div className="input-container">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={async (e) => {
            if (e.key === "Enter") {
              let result = await search(value);
              setSearchedUsers(result);
            }
          }}
          placeholder="Search Twitter..."
        />
      </div>
      <div className="card-container">
        <div className="who-to-follow-card">
          <div className="header">
            <h3>{searchedUsers ? "Search Results" : "Who to Follow"}</h3>
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
            {!searchedUsers
              ? suggestedUsers
              : searchedUsersJSX.length === 0
              ? "No Result Found"
              : searchedUsersJSX}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
