import React from "react";
import { Tweet, TweetBox, Layout } from "../components";
import { isAuthenticated } from "../helpers/api-user";
import { getNewsFeedTweets } from "../helpers/api-tweet";
import { redirectTo } from "../helpers/utils";

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
      <Layout title={"Home"}>
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
      </Layout>
    );
  }
}

export default Home;
