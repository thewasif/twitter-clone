import React from "react";
import "./style.scss";

const Loader = (props) => {
  let { hidden, inverted } = props;
  if (inverted) {
    return <div className="loading-inverted" hidden={hidden}></div>;
  } else {
    return <div className="loading" hidden={hidden}></div>;
  }
};

export default Loader;
