import React from "react";

const Media = (props) => {
  let { img, name, username, bio } = props;
  return (
    <div className="user-media">
      <div
        className="img"
        style={{
          backgroundImage: `url("${img}")`,
        }}
      ></div>
      <div className="user-media-body">
        <h4 className="name"> {name} </h4>
        <small className="username">@{username}</small>
        <div className="bio">
          <p> {bio} </p>
        </div>
      </div>
    </div>
  );
};

export default Media;
