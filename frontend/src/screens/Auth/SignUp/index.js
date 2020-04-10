import React from "react";
import axios from "axios";
import "./style.scss";
import Header from "../../../components/Header";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.postData = this.postData.bind(this);
  }
  postData() {
    console.log("executing function...!");
    axios
      .post({
        method: "POST",
        url: "http://localhost:5000/auth/signup/",
        data: { username: "wasif", password: "pass" },
        json: true,
      })
      .then(() => {
        console.log("posted successfully from client");
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Sign Up</h1>
          <input
            type="text"
            name="username"
            value="m_wasif"
            spellCheck="false"
            className="input-field"
            placeholder="Username"
          />{" "}
          <input
            type="email"
            name="email"
            value="wasif33@outlook.com"
            spellCheck="false"
            className="input-field"
            placeholder="Email"
          />{" "}
          <input
            type="text"
            name="password"
            value="123456"
            placeholder="Password"
            className="input-field"
          />{" "}
          <label className="terms">
            <input type="checkbox" />I agrees to{" "}
            <a href="#">terms and services</a>
          </label>
          <button onClick={this.postData} className="submit-btn">
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
