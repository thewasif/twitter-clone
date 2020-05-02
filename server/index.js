const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const tweet = require("./routes/tweet.routes");

const app = express();

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(
  session({
    secret: "hT5doL2wA9_fsW1Anfa",
    saveUninitialized: true,
    resave: false,
  })
);

// Connect Database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("database connected..!");
});

// Routes
app.use("/api/user", auth);
app.use("/api/tweet", tweet);

app.get("/", (req, res) => {
  res.send(req.session);
});

// Host
let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
