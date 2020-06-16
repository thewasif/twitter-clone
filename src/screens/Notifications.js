import React, { useEffect, useState } from "react";
import { Notifcation, Loader, Layout } from "../components";
import { getNotifications } from "../helpers/api-notifications";

function Notifications(props) {
  // component State
  let [notifications, setNotifications] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fecthData() {
      let data = await getNotifications();
      setNotifications(data);
      setLoading(false);
    }
    fecthData();
  }, []);

  let nots_jsx = notifications.map((notification) => {
    return (
      <Notifcation
        key={notification._id}
        id={notification._id}
        username={notification.username}
        text={notification.text}
        link={notification.link}
        time={notification.time}
        read={notification.read}
      />
    );
  });

  return (
    <Layout title="Notifications">
      <div
        className="not"
        style={
          loading
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }
            : {
                height: "100%",
              }
        }
      >
        {loading ? (
          <Loader />
        ) : nots_jsx.length === 0 ? (
          <h3
            className="msg"
            style={{ fontFamily: "Montserrat", textAlign: "center" }}
          >
            You're all catch up!
          </h3>
        ) : (
          nots_jsx
        )}
      </div>
    </Layout>
  );
}

export default Notifications;
