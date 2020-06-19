import React from "react";
import { Link } from "react-router-dom";
import welcomeImage from "../../images/welcome_image.png";

const WelcomeImage = () => {
  return (
    <div className="welcome-msg">
      <img src={welcomeImage} className="img-welcome" alt="Welcome" />
      <h3>See what's happening in the world!</h3>
      <div className="btn-group">
        <Link to="/flow/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/flow/signup">
          <button className="btn">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeImage;
