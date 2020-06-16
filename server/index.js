const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const tweet = require("./routes/tweet.routes");
const notifications = require("./routes/notification.routes");
const Tweet = require("./models/tweet.model");

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
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("👌 Database Connected..");
  })
  .catch((err) => {
    if (err) {
      console.log("❌ ERROR WHILE CONNECTING TO DATABASE: ", err);
    }
  });

const server = http.createServer(app);

const io = socketio(server);
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Routes
app.use("/api/user", auth);
app.use("/api/tweet", tweet);
app.use("/api/notifications", notifications);

app.get("/", (req, res) => {
  res.send(req.session);
});

/*
let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  //socket.emit("FromAPI", "hello");
  socket.on("updateLikes", async (id) => {
    console.log("Give me reacts of ", id);
    let tweets = await Tweet.find({ replidTo: id });
    console.log(tweets);

    //socket.emit("getLikes", tweet.hearts.length + 1);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
*/

// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };
// Host
let PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
