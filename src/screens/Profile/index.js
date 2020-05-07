import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../helpers/api-user";
import { ProfileHeader, Navigator, Loader } from "../../components";
import "./style.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: {},
      additionalData: {},
      loading: true,
    };
  }
  async componentDidMount() {
    let user = await getUser(this.props.match.params.user);
    this.setState({
      userObj: user,
      additionalData: user.additionalData,
      loading: false,
    });
  }
  render() {
    let user = this.state.userObj,
      additionalData = this.state.additionalData;

    let editable =
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
          {this.state.loading ? (
            <Loader />
          ) : (
            <ProfileHeader
              username={`@${user.username}`}
              name={additionalData.name}
              bio={additionalData.bio}
              location={additionalData.location}
              dob={additionalData.dob}
              joined={user.createdAt}
              website={additionalData.website}
              profilePhoto={additionalData.profilePic}
              coverPhoto={additionalData.coverPhoto}
              editable={editable}
            />
          )}
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
