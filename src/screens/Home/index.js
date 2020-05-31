import React from "react";
import { connect } from "react-redux";
import { Navigator, Tweet, TweetBox, TweetModel } from "../../components";
import { isAuthenticated } from "../../helpers/api-user";
import { redirectTo } from "../../helpers/utils";
import "./style.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      additionalData: {},
    };
  }

  async componentDidMount() {
    let user = await isAuthenticated();
    if (user) {
      this.setState({ user, additionalData: user.additionalData });
    } else {
      redirectTo("/flow/welcome");
    }
  }
  render() {
    return (
      <div className="app-container">
        <div className="section">
          <Navigator />
        </div>
        <div className="section">
          <div className="title-container">
            <h1 className="title">Home</h1>
          </div>
          <div className="tweet-box-container">
            <TweetBox profile_pic={this.state.additionalData.profilePic} />
            <Tweet
              text={"Hello, World!"}
              hearts={21}
              replies={3}
              retweets={0}
              time={"3 March, 2020"}
              username={"wasif"}
              name={"Muhammad Wasif"}
              pic={
                "http://res.cloudinary.com/ddrsfmh8b/image/upload/v1588440600/oug0xmq5bsrrf8kp6rpx.jpg"
              }
            />
          </div>
        </div>
        <div className="section">sec 3</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => dispatch({ type: "ADD" }),
    subtract: () => dispatch({ type: "SUBTRACT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
