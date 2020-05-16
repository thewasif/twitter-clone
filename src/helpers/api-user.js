const create = async (data) => {
  let res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(await res.json());
};

const isAuthenticated = async () => {
  let tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
  try {
    let isAuthenticated = await fetch(
      `http://localhost:5000/api/user/verify?JWT_TOKEN=${tokenObj.token}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenObj.token,
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
  let user = await fetch(
    `http://localhost:5000/api/user?username=${username}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (user.status === 404) {
    return 404;
  }

  return await user.json();
};

const getUserByID = async (userID) => {
  let user = await fetch(`http://localhost:5000/api/user?userID=${userID}`, {
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

export { isAuthenticated, getUser, getUserByID };
