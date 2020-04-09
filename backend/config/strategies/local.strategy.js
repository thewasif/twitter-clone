const passport = require("passport");
const { Strategy } = require("passport-local");

const localStrategy = () => {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        let user = {
          username,
          password,
        };
        done(null, user);
      }
    )
  );
};

module.exports = localStrategy;
