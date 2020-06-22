import React from "react";
import { isAuthenticated } from "../../../helpers/api-user";
import { SERVER } from "../../../helpers/utils";
import "./style.scss";
import { Loader, Header } from "../../../components/";

class SetUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      website: "",
      bio: "",
      dob: "",
      profilePic: "",
      coverPhoto: "",
      btnDisabled: false,
      error: "none",
      errorText: "",
      tokenObj: JSON.parse(localStorage.getItem("JWT_TOKEN")),
    };
    this.postData = this.postData.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
  }
  async componentDidMount() {
    let auth = await isAuthenticated();

    if (auth.additionalData) {
      let name = auth.additionalData.name || "";
      this.setState({
        name,
        location: auth.additionalData.location,
        bio: auth.additionalData.bio,
        website: auth.additionalData.website,
        dob: auth.additionalData.dob,
        profilePic: auth.additionalData.profilePic,
        coverPhoto: auth.additionalData.coverPhoto,
      });
    } else {
      //redirectTo("/flow/welcome");
    }
  }
  async postData(e) {
    e.preventDefault();
    this.setState({
      btnDisabled: true,
    });
    const userData = {
      name: this.state.name,
      location: this.state.location,
      website: this.state.website,
      bio: this.state.bio,
      dob: this.state.dob,
      profilePic: this.state.profilePic,
      coverPhoto: this.state.coverPhoto,
    };

    let res = await fetch(`${SERVER}/api/user/editprofile`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.tokenObj.token,
      }),
      body: JSON.stringify(userData),
    });

    res
      .json()
      .then((data) => {
        this.setState({ btnDisabled: false });
        window.location.pathname = "/" + localStorage.getItem("username");
      })
      .catch((e) => {
        this.setState({ btnDisabled: false });
        window.location.pathname = "/" + localStorage.getItem("username");
      });
  }
  async uploadPhotos() {
    this.setState({ btnDisabled: true });
    var data = new FormData();
    data.append("image", this.refs.file.files[0]);
    data.append("image", this.refs.filetwo.files[0]);
    let res = await fetch(`${SERVER}/api/user/upload`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.tokenObj.token,
      },
      body: data,
    });
    res.json().then((e) => {
      console.log(e);
      this.setState({ btnDisabled: false });
      window.location.pathname = "/" + localStorage.getItem("username");
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Header />
        <div className="form-container">
          <h1 className="title">Set up your profile</h1>
          <input type="file" name="image" ref="file" />
          <input type="file" name="image" ref="filetwo" />
          <button onClick={this.uploadPhotos}>
            {this.state.btnDisabled ? <Loader /> : "Save"}
          </button>
          <form>
            <label style={{ display: this.state.error }} className="error">
              {this.state.errorText}
            </label>
            <input
              type="text"
              name="location"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              spellCheck="false"
              className="input-field"
              placeholder="Full Name"
            />{" "}
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={(e) => {
                this.setState({ location: e.target.value });
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
                this.setState({ website: e.target.value });
              }}
              placeholder="Website"
              className="input-field"
            />{" "}
            <textarea
              name="bio"
              rows={4}
              value={this.state.bio}
              onChange={(e) => {
                this.setState({ bio: e.target.value });
              }}
              placeholder="Bio"
              className="input-field"
            ></textarea>
            <input
              type="date"
              name="dob"
              value={this.state.dob}
              onChange={(e) => {
                this.setState({ dob: e.target.value });
              }}
              placeholder="Date of Birth"
              className="input-field"
            />{" "}
            <button
              type="submit"
              onClick={this.postData}
              className="submit-btn"
            >
              {this.state.btnDisabled ? <Loader /> : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SetUp;
