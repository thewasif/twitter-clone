import React from "react";
import "./style.scss";

const Loader = (props) => {
  let { hidden } = props;

  return <div className="loading" hidden={hidden}></div>;
};

export default Loader;
