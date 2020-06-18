import React from "react";
import { Tweet, TweetBox, Layout, TweetModel, Loader } from "../components";
import { isAuthenticated } from "../helpers/api-user";
import { getNewsFeedTweets } from "../helpers/api-tweet";
import { redirectTo, flexCenter } from "../helpers/utils";
import { ToastContainer } from "react-toastify";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      additionalData: {},
      tweets: [],
      page: 1,
      visible: false,
      orgTweetID: "",
      loading: true,
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
    this.setState({ tweets, loading: false });
  }
  render() {
    let tweets = this.state.tweets.map((tweet) => {
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
    });

    return (
      <Layout title={"Home"}>
        <TweetBox profile_pic={this.state.additionalData.profilePic} />
        {tweets.length === 0 ? (
          <div style={this.state.loading ? flexCenter : {}}>
            {this.state.loading ? (
              <Loader />
            ) : (
              <h2>No Tweets to Show! Make sure to follow someone</h2>
            )}
          </div>
        ) : (
          tweets
        )}
        <TweetModel
          orgTweetID={this.state.orgTweetID}
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
        />
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover={false}
        />
      </Layout>
    );
  }
}

export default Home;
