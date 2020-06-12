import React, { Component } from "react";
import { getUser } from "../../helpers/api-user";
import { getTweets } from "../../helpers/api-tweet";
import {
  ProfileHeader,
  Navigator,
  Loader,
  Tweet,
  TweetModel,
} from "../../components";
import "./style.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: {},
      additionalData: {},
      loading: true,
      tweets: [],
      visible: false,
      orgTweetID: "",
    };
  }
  async componentDidMount() {
    let user = await getUser(this.props.match.params.user);
    this.setState({
      userObj: user,
      additionalData: user.additionalData,
      loading: false,
    });
    let tweets = await getTweets(this.props.match.params.user);
    this.setState({ tweets });
  }

  render() {
    let user = this.state.userObj,
      additionalData = this.state.additionalData,
      editable =
        localStorage.getItem("username") === this.props.match.params.user
          ? true
          : false;

    return (
      <div className="app-container">
        <div className="section">
          <Navigator />
        </div>
        <div
          className="section"
          style={
            this.state.loading
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {}
          }
        >
          <TweetModel
            visible={this.state.visible}
            orgTweetID={this.state.orgTweetID}
            onClose={() => {
              this.setState({ visible: false });
            }}
          />

          {this.state.loading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <ProfileHeader
                username={`@${user.username}`}
                userID={user._id}
                name={additionalData.name}
                bio={additionalData.bio}
                location={additionalData.location}
                dob={additionalData.dob}
                joined={user.createdAt}
                website={additionalData.website}
                profilePhoto={additionalData.profilePic}
                coverPhoto={additionalData.coverPhoto}
                editable={editable}
                followers={user.followers}
                following={user.following}
              />
              <div>
                {this.state.tweets.map((tweet) => {
                  console.log("execute");
                  return (
                    <Tweet
                      key={tweet.text}
                      text={tweet.text}
                      hearts={tweet.hearts}
                      replies={tweet.replies.length}
                      retweets={tweet.retweets.length}
                      time={tweet.time}
                      username={user.username}
                      name={additionalData.name}
                      pic={additionalData.profilePic}
                      id={tweet._id}
                      userID={tweet.userID}
                      onReplyClick={() => {
                        this.setState({ visible: true, orgTweetID: tweet._id });
                      }}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="section">sec 3</div>
      </div>
    );
  }
}

export default Profile;
