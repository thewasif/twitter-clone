import { SERVER } from "./utils";
const isAuthenticated = async () => {
  try {
    let isAuthenticated = await fetch(
      `${SERVER}/api/user/verify?JWT_TOKEN=${
        JSON.parse(localStorage.getItem("JWT_TOKEN")).token
      }`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );

    if (isAuthenticated.status === 200) {
      return await isAuthenticated.json();
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getUser = async (username) => {
  let user = await fetch(`${SERVER}/api/user?username=${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (user.status === 404) {
    return 404;
  }

  return await user.json();
};

const getUserByID = async (userID) => {
  let user = await fetch(`${SERVER}/api/user?userID=${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (user.status === 404) {
    return 404;
  }

  return await user.json();
};

let actions = {
  follow: async (userID) => {
    let tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    let res = await fetch(
      `${SERVER}/api/user/follow/?userToBeFollowed=${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenObj.token,
        },
        body: JSON.stringify({}),
      }
    );
    res.json().then((res) => {
      console.log(res);
    });
  },

  unfollow: async (userID) => {
    let tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    let res = await fetch(
      `${SERVER}/api/user/unfollow/?userToBeUnFollowed=${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenObj.token,
        },
        body: JSON.stringify({}),
      }
    );
    res.json().then((res) => {
      console.log(res);
    });
  },
};

export { isAuthenticated, getUser, getUserByID, actions };
