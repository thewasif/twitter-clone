import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Welcome from "./screens/Welcome/index";
import Status from "./screens/Status";
import Search from "./screens/Search";
import Notifications from "./screens/Notifications";
import { SignUp, LogIn, Setup, Logout } from "./screens/Auth";
import "./scss/media-queries.scss";
import "react-toastify/dist/ReactToastify.css";
import "./scss/global.scss";
import { Provider } from "./context/GlobalContext";

class App extends Component {
  render() {
    return (
      <Provider>
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
          <Route path="/i/search" exact component={Search} />
        </Router>
      </Provider>
    );
  }
}

export default App;
