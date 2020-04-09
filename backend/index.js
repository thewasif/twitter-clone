const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const auth = require("./routes/auth");

app.use(express.json());
app.use(session({ secret: "fjkhfasf0fsfsf" }));
app.use(cookieParser());
require("./config/passport")(app);

// Routes
app.use("/auth", auth);

app.get("/", (req, res) => {
  const json = [{ type: "backend" }];
  res.send(json);
});

// Start the server
let PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on  http://localhost:${PORT}`);
});
