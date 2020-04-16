import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./style.scss";
import Header from "../../../components/Header";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      website: "",
      bio: "",
      dob: "",
      btnDisabled: false,
      error: "none",
      errorText: "",
    };
    this.postData = this.postData.bind(this);
  }
  postData(e) {
    e.preventDefault();
    this.setState({
      btnDisabled: true,
    });
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("http://localhost:5000/auth/login", userData)
      .then((res) => {
        console.log(`${res.status} - ${res.statusText}`);
        this.setState({
          btnDisabled: false,
          error: "block",
          errorText: res.data,
        });
      })
      .catch((e) => {
        this.setState({
          btnDisabled: false,
          error: "block",
          errorText: "Your password is incorrect",
        });
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Set up your profile</h1>
          <form action="http://localhost:5000/auth/signup" method="POST">
            <label style={{ display: this.state.error }}>
              {this.state.errorText}
            </label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
              spellCheck="false"
              className="input-field"
              placeholder="Location"
            />{" "}
            <input
              type="text"
              name="website"
              value={this.state.website}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Website"
              className="input-field"
            />{" "}
            <textarea
              name="bio"
              rows={4}
              value={this.state.bio}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Bio"
              className="input-field"
            ></textarea>
            <input
              type="date"
              name="dob"
              value={this.state.dob}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Date of Birth"
              className="input-field"
            />{" "}
            <button
              type="submit"
              onClick={this.postData}
              className="submit-btn"
            >
              {this.state.btnDisabled ? "loading..." : "Continue"}
              <i className="fas fa-arrow-right" style={{ marginLeft: 8 }}></i>
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

export default connect(mapStateToProps)(LogIn);
