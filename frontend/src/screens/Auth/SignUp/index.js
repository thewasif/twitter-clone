import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Sign Up</h1>
          <form action="http://localhost:5000/auth/signup" method="POST">
            <input
              type="text"
              name="username"
              required
              minLength={3}
              maxLength={20}
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
              <a href="#">terms and services</a>
            </label>
            <button
              type="submit"
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

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (val) => dispatch({ type: "SET", text: val }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
