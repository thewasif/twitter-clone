import React from "react";
import { Navigator, Tweet, TweetBox } from "../../components";
import { isAuthenticated } from "../../helpers/api-user";
import { getNewsFeedTweets } from "../../helpers/api-tweet";
import { redirectTo } from "../../helpers/utils";
import "./style.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      additionalData: {},
      tweets: [],
      page: 1,
    };
  }

  async componentDidMount() {
    let user = await isAuthenticated();
    if (user) {
      this.setState({ user, additionalData: user.additionalData });
    } else {
      redirectTo("/flow/welcome");
    }

    let tweets = await getNewsFeedTweets(this.state.page, 10);
    this.setState({ tweets });
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
            {this.state.tweets.map((tweet) => {
              return (
                <Tweet
                  key={tweet._id}
                  text={tweet.text}
                  hearts={tweet.hearts}
                  replies={tweet.replies.length}
                  retweets={tweet.retweets.length}
                  time={tweet.time}
                  id={tweet._id}
                  userID={tweet.userID}
                  onReplyClick={() => {
                    this.setState({ visible: true, orgTweetID: tweet._id });
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="section">sec 3</div>
      </div>
    );
  }
}

export default Home;
