import React, { useState, useEffect } from "react";
import "./style.scss";
import Media from "../Media";

function Modal(props) {
  // Component State
  let [visible, setVisibilty] = useState(props.visible);

  // props variables
  let { users } = props;

  useEffect(() => {
    setVisibilty(props.visible);
  }, [props.visible]);

  return (
    <div
      className="modal-background"
      style={visible ? { transform: "scale(1)" } : { transform: "scale(0)" }}
    >
      <div
        className="model"
        style={visible ? { transform: "scale(1)" } : { transform: "scale(0)" }}
      >
        <div className="model-header">
          <button className="model-btn-close" onClick={props.onClose}>
            <i className="fa fa-times"></i>
          </button>
          <p className="modal-title">Likes</p>
        </div>
        <div className="model-body">
          {users.map((user) => (
            <Media key={user} userID={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
