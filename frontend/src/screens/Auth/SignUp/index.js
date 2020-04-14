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
      btnDisabled: false,
      error: "none",
      errorText: "",
    };
    this.postData = this.postData.bind(this);
  }
  postData(e) {
    e.preventDefault();
    this.setState({ btnDisabled: true });
    let password = this.state.password,
      username = this.state.username,
      email = this.state.email;
    if (password == "" || password.length < 6) {
      this.setState({
        errorText: "Password is too weak",
        error: "block",
        btnDisabled: false,
      });
      return;
    } else if (email == "" || username == "") {
      this.setState({
        errorText: "Please fill the form",
        error: "block",
        btnDisabled: false,
      });
      return;
    }
    const userData = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      createdAt: new Date(),
    };

    axios
      .post("http://localhost:5000/auth/signup", userData)
      .then((res) => {
        console.log(`${res.status} - ${res.statusText}`);
        this.setState({ btnDisabled: false });
      })
      .catch((e) => {
        this.setState({
          btnDisabled: false,
          errorText: "Username or email already exists!",
          error: "block",
        });
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Sign Up</h1>
          <form action="http://localhost:5000/auth/signup" method="POST">
            <label style={{ display: this.state.error }}>
              {this.state.errorText}
            </label>
            <input
              type="text"
              name="username"
              required
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
              required
            />{" "}
            <input
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
              className="input-field"
            />{" "}
            <label className="terms">
              <input type="checkbox" />I agree to{" "}
              <a href="#">terms and services</a>
            </label>
            <button
              type="submit"
              onClick={this.postData}
              className="submit-btn"
              disabled={this.state.btnDisabled}
            >
              {this.state.btnDisabled ? "loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
