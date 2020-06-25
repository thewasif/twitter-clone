import { JWT_TOKEN, USER_ID, SERVER } from "./utils";

const getTweets = async (username) => {
  let user = await fetch(`${SERVER}/api/tweet?username=${username}`, {
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

const getTweet = async (id) => {
  let user = await fetch(`${SERVER}/api/tweet/${id}`, {
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
  like: (tweetID) => {
    let data = { tweetID: tweetID },
      tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    fetch(`${SERVER}/api/tweet/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenObj.token,
      },
      body: JSON.stringify(data),
    });
  },
  unlike: (tweetID) => {
    let data = { tweetID: tweetID },
      tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    fetch(`${SERVER}/api/tweet/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenObj.token,
      },
      body: JSON.stringify(data),
    });
  },
};

const postTweet = async (text, tokenObj) => {
  let data = { text: text };
  let res = await fetch(`${SERVER}/api/tweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenObj.token,
    },
    body: JSON.stringify(data),
  });

  return res;
};

const getReplies = async (tweetID, tokenObj) => {
  let data = { tweetID: tweetID };
  let res = await fetch(`${SERVER}/api/tweet/getReplies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenObj.token,
    },
    body: JSON.stringify(data),
  });

  return res;
};

const postReply = async (text, orgTweetID) => {
  let data = { text: text, orgTweetID: orgTweetID },
    tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
  let res = await fetch(`${SERVER}/api/tweet/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenObj.token,
    },
    body: JSON.stringify(data),
  });

  return res;
};

const getNewsFeedTweets = async () => {
  if (USER_ID) {
    let res = await fetch(`${SERVER}/api/tweet/newsfeed/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT_TOKEN.token,
      },
      body: JSON.stringify({}),
    });

    return await res.json();
  }
};

const search = async (query) => {
  let res = await fetch(`${SERVER}/api/user/search/?q=${query}`);

  let data = await res.json();
  return data;
};

export {
  postTweet,
  getTweets,
  getTweet,
  getReplies,
  postReply,
  getNewsFeedTweets,
  actions,
  search,
};
