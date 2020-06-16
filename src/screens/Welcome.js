import React from "react";
import Layout from "../components/Layout";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout>
        <div>
          <p>This is from an other screen</p>
        </div>
      </Layout>
    );
  }
}

export default Welcome;
