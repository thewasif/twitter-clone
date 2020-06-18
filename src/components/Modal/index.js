import React, { useState, useEffect } from "react";
import "./style.scss";
import Media from "../Media";

function Modal(props) {
  // props variables
  let { users } = props;

  // Component State
  let [visible, setVisibilty] = useState(props.visible);

  useEffect(() => {
    setVisibilty(props.visible);
  }, [props.visible]);

  let userMedias = users.map((user) => <Media key={user} userID={user} />);
  return (
    <div
      className="modal-background"
      style={visible ? { transform: "scale(1)" } : { transform: "scale(0)" }}
    >
      <div
        className="modal"
        style={visible ? { transform: "scale(1)" } : { transform: "scale(0)" }}
      >
        <div className="modal-header">
          <button className="modal-btn-close" onClick={props.onClose}>
            <i className="fa fa-times"></i>
          </button>
          <p className="modal-title">Likes</p>
        </div>
        <div className="modal-body">
          {userMedias.length === 0 ? "No one has liked this tweet" : userMedias}
        </div>
      </div>
    </div>
  );
}

export default Modal;
