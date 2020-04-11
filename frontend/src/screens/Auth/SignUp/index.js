import React from "react";
import axios from "axios";
import "./style.scss";
import Header from "../../../components/Header";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
    this.postData = this.postData.bind(this);
  }
  postData(e) {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    console.log("userData:", userData);
    axios
      .post("http://localhost:5000/auth/signup", userData)
      .then((res) => {
        console.log(res.data, "client");
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
          <form onSubmit={this.postData}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
              spellCheck="false"
              className="input-field"
              placeholder="Username"
            />{" "}
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              spellCheck="false"
              className="input-field"
              placeholder="Email"
            />{" "}
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
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
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
