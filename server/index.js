const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const tweet = require("./routes/tweet");

const app = express();

// Middlewares
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(session({ secret: "hT5doL2wA9_fsW1Anfa" }));

// Connect Database
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("database connected..!");
});

// Routes
app.use("/auth", auth);
app.use("/tweet", tweet);

app.get("/", (req, res) => {
  res.send(req.session);
});

// Host
let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
