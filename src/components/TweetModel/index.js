import React, { useState, useEffect } from "react";
import "./style.scss";

function TweetModel(props) {
  // Component State
  let [visible, setVisibilty] = useState(props.visible);

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
        </div>
        <div className="model-body">
          <div>
            <div
              className="profile-pic"
              style={{ backgroundImage: `url("${props.image}")` }}
            ></div>
          </div>
          <div className="modal-input-container">
            <textarea
              rows={10}
              className="modal-input"
              placeholder="Tweet your reply..."
            />
            <div className="model-footer">
              <div className="options">
                <div className="group-icons">
                  <button className="btn-icon">
                    <i className="far fa-image"></i>
                  </button>
                  <button className="btn-icon">
                    <i className="fa fa-poll"></i>
                  </button>
                  <button className="btn-icon">
                    <i className="far fa-smile"></i>
                  </button>
                </div>
                <button className="tweet-btn">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetModel;
