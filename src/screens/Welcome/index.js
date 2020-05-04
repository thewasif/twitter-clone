import React from "react";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>This is from an other screen</p>
      </div>
    );
  }
}

export default Welcome;
