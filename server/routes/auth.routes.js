const route = require("express").Router();
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
let Tweet = require("../models/tweet.model");
const verifyToken = require("../helpers/verifyToken");
const upload = require("../config/multer");
const {
  signup,
  login,
  editInfo,
  getUser,
  verifyAuth,
  uploadRoute,
} = require("../controllers/auth.controller");

let SECRET = process.env.JWT_SECRET;

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

// upload photos for a profile
route.post("/upload", verifyToken, upload.array("image"), uploadRoute);

// Follow a user
route.post("/follow", verifyToken, async (req, res) => {
  let { userToBeFollowed } = req.query;

  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (user.password === auth.user.password) {
      User.findOneAndUpdate(
        { _id: userToBeFollowed },
        { $push: { followers: auth.user._id } }
      )
        .then((response) => {
          User.findOneAndUpdate(
            { _id: auth.user._id },
            { $push: { following: userToBeFollowed } }
          )
            .then((response_two) => {
              res.send(response_two);
            })
            .catch((e) => {
              res.send(e);
            });
        })
        .catch((e) => {
          res.send(e);
        });
    }
  });
});

module.exports = route;
