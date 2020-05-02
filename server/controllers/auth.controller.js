const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user.model");

let SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body,
      createdAt = new Date();

    // check if user already exists or not
    let user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(400).send("User already exists!");
    }

    // save the user to database
    let newUser = new User({ username, email, password, createdAt });
    newUser
      .save()
      .then(() => {
        res.status(200).send("User saved!");
      })
      .catch((e) => {
        res.status(400).send("An error occurred!");
      });
  } catch (err) {
    res.send("Could not Sign Up");
  }
};

const login = async (req, res) => {
  let { username, password } = req.body;

  User.authenticate(username, password, (e, user) => {
    if (user) {
      console.log("user authenticated!");
      jwt.sign(
        {
          user: user,
        },
        SECRET,
        (err, token) => {
          if (err) {
            return res.send("an error occurred");
          }

          res.json({ token });
        }
      );
    } else {
      res.status(400).send("an error occurred");
    }
  });
};

const editInfo = async (req, res) => {
  // verify user stored in local storage and user in database
  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) {
      console.log(err);
      return res.sendStatus("403");
    }
    let user = await User.findOne({ email: auth.user.email });

    if (user.password !== auth.user.password) {
      return res.sendStatus("403");
    }

    User.findOneAndUpdate(
      { _id: user._id },
      { $set: { additionalData: req.body } }
    ).then((response) => {
      return res.sendStatus("200");
    });
  });
};

const getUser = async (req, res) => {
  let { username } = req.query;

  let user = await User.findOne({ username });

  if (!user) return res.sendStatus("404");

  let dataToBeSent = {
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    additionalData: user.additionalData,
  };

  res.json(dataToBeSent);
};

const verifyAuth = (req, res) => {
  console.log("GET");
  let { JWT_TOKEN } = req.query;

  jwt.verify(JWT_TOKEN, process.env.JWT_SECRET, async (err, auth) => {
    if (err) return res.sendStatus("403");

    let user = await User.findById(auth.user._id);

    if (user.password !== auth.user.password) return res.sendStatus("403");
    console.log("200");

    return res.json(user);
  });
};

const uploadRoute = async (req, res) => {
  jwt.verify(req.token, SECRET, async (err, auth) => {
    if (err) {
      console.log(err);
      return res.sendStatus("403");
    }

    let user = await User.findOne({ email: auth.user.email });

    if (user.password !== auth.user.password) {
      return res.sendStatus("403");
    }

    const uploader = async (path) => await cloudinary.uploads(path, "Images");
    let urls = [],
      files = req.files;

    for (let file of files) {
      const { path } = file;
      const newPath = await uploader(path);

      urls.push(newPath);

      fs.unlinkSync(path);
    }

    User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          additionalData: {
            ...user.additionalData,
            profilePic: urls[0].url,
            coverPhoto: urls[1].url,
          },
        },
      }
    ).then((response) => {
      return res.json({
        data: urls,
      });
    });
  });
};

module.exports = {
  signup,
  login,
  editInfo,
  getUser,
  verifyAuth,
  uploadRoute,
};
