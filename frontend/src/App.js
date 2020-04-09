import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./screens/Home";
import Other from "./screens/Other";
import { SignUp } from "./screens/Auth";
import "./scss/media-queries.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/auth/signup" exact component={SignUp} />
        <Route path="/other" exact component={Other} />
      </Router>
    );
  }
}

export default App;
