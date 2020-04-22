const route = require("express").Router();
const mongoose = require("mongoose");

const connection = mongoose.connection;

route.get("/", (req, res) => {
  connection.collection("users").find({}, {}, (er, doc) => {
    console.log(doc);
    console.log(er);
  });
  res.send("hey");
});

module.exports = route;
