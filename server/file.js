let mongoose = require("mongoose");

let con = mongoose.connection;

let stream = con
  .useDb("test")
  .collection("users")
  .watch({ fullDocument: "updateLookup" });

stream.on("change", (e) => {
  console.log(JSON.stringify(e));
});
