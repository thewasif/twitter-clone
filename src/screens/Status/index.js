import React, { useEffect } from "react";
import { getTweet } from "../../helpers/api-tweet";
import { Navigator, Status as StatusComponent } from "../../components";
import "./style.scss";

function Status(props) {
  let id = props.match.params.id;

  useEffect(() => {
    async function fetchData() {
      let tweet = await getTweet(id);
      console.log(tweet);
    }

    fetchData();
  }, []);
  return (
    <div className="app-container">
      <div className="section">
        <Navigator />
      </div>
      <div className="section">
        <div className="title-container">
          <h1 className="title">Tweet</h1>
        </div>
        <div className="tweet-box-container">
          <StatusComponent
            text={
              "Hello, World! This Twitter is created with React on client side and Node.js on server side."
            }
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

export default Status;
