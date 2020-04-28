const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

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

module.exports = {
  signup,
  login,
};
