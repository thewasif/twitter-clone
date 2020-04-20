const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const auth = require("./routes/auth");
const keys = require("./keys");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: true,
  })
);
require("./config/passport")(app);

// Database config

mongoose.connect(keys.mongooseURI, () => {
  console.log("Connected to database");
});

// Routes
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
let PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on  http://localhost:${PORT}`);
});
