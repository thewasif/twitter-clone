import React, { useEffect, useState } from "react";
import { Navigator, Notifcation } from "../../components";
import { getNotifications } from "../../helpers/api-notifications";

function Notifications(props) {
  // component State
  let [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fecthData() {
      let data = await getNotifications();
      setNotifications(data);
    }
    fecthData();
  }, []);

  return (
    <div className="app-container">
      <div className="section">
        <Navigator />
      </div>
      <div className="section">
        <div className="title-container">
          <h1 className="title">Notifications</h1>
        </div>
        {notifications.map((notification) => {
          return (
            <Notifcation
              username={notification.username}
              text={notification.text}
              link={notification.link}
            />
          );
        })}
      </div>
      <div className="section">sec 3</div>
    </div>
  );
}

export default Notifications;
