function verifyToken(req, res, next) {
  let BEARER = req.headers["authorization"];
  console.log(BEARER, "BEAR");
  if (typeof BEARER !== "undefined") {
    let arr = BEARER.split(" ");
    req.token = arr[1];
    next();
  } else {
    console.log("SOMETHING ELSE");
    res.sendStatus("403");
  }
}

module.exports = verifyToken;
