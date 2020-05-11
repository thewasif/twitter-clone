const getTweets = async (username) => {
  let user = await fetch(
    `http://localhost:5000/api/tweet?username=${username}`,
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

export { getTweets };
