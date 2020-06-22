import { JWT_TOKEN, SERVER } from "./utils";

const getNotifications = async () => {
  let res = await fetch(`${SERVER}/api/notifications`, {
    headers: {
      Authorization: `Beared ${JWT_TOKEN.token}`,
    },
  });

  let data = await res.json();

  return data;
};

export { getNotifications };
