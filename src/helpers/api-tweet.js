import { JWT_TOKEN } from "./utils";

const getTweets = async (username) => {
  let user = await fetch(`/api/tweet?username=${username}`, {
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
  let user = await fetch(`/api/tweet/${id}`, {
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
    console.log("LIKE");
    let data = { tweetID: tweetID },
      tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    fetch("/api/tweet/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenObj.token,
      },
      body: JSON.stringify(data),
    });
  },
  unlike: (tweetID) => {
    console.log("UNLIKE");
    let data = { tweetID: tweetID },
      tokenObj = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    fetch("/api/tweet/unlike", {
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
  let res = await fetch("/api/tweet", {
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
  let res = await fetch("/api/tweet/getReplies", {
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
  let res = await fetch("/api/tweet/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenObj.token,
    },
    body: JSON.stringify(data),
  });

  return res;
};

const getNewsFeedTweets = async (pageNo, size) => {
  let res = await fetch(`/api/tweet/newsfeed/?pageNo=${pageNo}&size=${size}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT_TOKEN.token,
    },
    body: JSON.stringify({}),
  });

  return await res.json();
};

export {
  postTweet,
  getTweets,
  getTweet,
  getReplies,
  postReply,
  getNewsFeedTweets,
  actions,
};
