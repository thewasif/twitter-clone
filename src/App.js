import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Profile, Welcome, Status, Notifications } from "./screens";
import { SignUp, LogIn, Setup, Logout } from "./screens/Auth";
import "./scss/media-queries.scss";
import "./scss/global.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/flow/signup" exact component={SignUp} />
        <Route path="/flow/login" exact component={LogIn} />
        <Route path="/flow/setup" exact component={Setup} />
        <Route path="/flow/logout" exact component={Logout} />
        <Route path="/:user" exact component={Profile} />
        <Route path="/flow/welcome" exact component={Welcome} />
        <Route path="/status/:id" exact component={Status} />
        <Route path="/i/notifications" exact component={Notifications} />
      </Router>
    );
  }
}

export default App;
