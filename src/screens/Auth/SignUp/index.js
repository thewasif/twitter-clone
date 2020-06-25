import React from "react";
import "./style.scss";
import { Loader, Header } from "../../../components";
import { isAuthenticated } from "../../../helpers/api-user";
import { SERVER } from "../../../helpers/utils";

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
  async postData(e) {
    e.preventDefault();
    this.setState({ btnDisabled: true });
    let username = this.state.username,
      email = this.state.email,
      password = this.state.password;

    if (username.length < 3) {
      this.setState({
        error: "block",
        errorText: "Username is too short",
        btnDisabled: false,
      });
      return;
    } else if (password.length < 6) {
      this.setState({
        error: "block",
        errorText: "Password is too short",
        btnDisabled: false,
      });
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      this.setState({
        error: "block",
        btnDisabled: false,
        errorText: "Email is badly formatted",
      });
      return;
    }

    let data = {
      username,
      email,
      password,
    };
    fetch(`${SERVER}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let token = await res.json();
        localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
        localStorage.setItem("username", this.state.username);
        isAuthenticated().then((resp) => {
          localStorage.setItem("logged_in_user_id", resp._id);
          if (res.statusText === "OK") {
            window.location.pathname = "/flow/setup";
          }
        });
      })
      .catch((e) => {
        this.setState({
          errorText: "Username or Email already exists!",
          error: "block",
          btnDisabled: false,
        });
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Sign Up</h1>
          <form>
            <label style={{ display: this.state.error }}>
              {this.state.errorText}
            </label>
            <input
              type="text"
              name="username"
              required
              minLength={3}
              maxLength={15}
              value={this.state.username}
              onChange={(e) => {
                this.setState({ username: e.target.value.replace(" ", "") });
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
              minLength={6}
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
              className="input-field"
            />{" "}
            <label className="terms">
              <input type="checkbox" required />I agree to{" "}
              <a
                href="#welcome"
                onClick={() =>
                  alert("There are no terms and servcies. Just check this box")
                }
              >
                terms and services
              </a>
            </label>
            <button
              type="submit"
              className="submit-btn"
              onClick={this.postData}
              disabled={this.state.btnDisabled}
            >
              {this.state.btnDisabled ? <Loader /> : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
