import { JWT_TOKEN } from "./utils";

const getNotifications = async () => {
  let res = await fetch("/api/notifications", {
    headers: {
      Authorization: `Beared ${JWT_TOKEN.token}`,
    },
  });

  let data = await res.json();

  return data;
};

export { getNotifications };
