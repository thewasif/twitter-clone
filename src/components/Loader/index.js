import React from "react";
import "./style.scss";

export default ({ inverted }) => {
  return inverted ? (
    <div className="loading-inverted"></div>
  ) : (
    <div className="loading"></div>
  );
};
