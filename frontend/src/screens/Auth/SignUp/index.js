import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.postData = this.postData.bind(this);
  }
  postData() {
    console.log("executing function...!");
    axios
      .post("http://localhost:5000/auth/signup", {
        username: "muhammadwasif",
        password: "123456",
      })
      .then(() => {
        console.log("posted successfully from client");
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <div>
        username: <input type="text" name="username" value="m_wasif" /> <br />
        password: <input type="text" name="password" value="123456" /> <br />
        <button onClick={this.postData}>Sign Up</button>
      </div>
    );
  }
}

export default SignUp;
