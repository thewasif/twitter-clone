const route = require("express").Router();
const verifyToken = require("../helpers/verifyToken");
const {
  signup,
  login,
  editInfo,
  getUser,
  verifyAuth,
} = require("../controllers/auth.controller");

// get detail about a user
route.get("/", getUser);

// post signup data to register a new user
route.post("/signup", signup);

// post login data to login
route.post("/login", login);

// post data such as bio, name etc
route.post("/editprofile", verifyToken, editInfo);

// verify user auth
route.get("/verify", verifyAuth);

module.exports = route;
