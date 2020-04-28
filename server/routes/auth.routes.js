const route = require("express").Router();
const { signup, login } = require("../controllers/auth.controller");

route.post("/signup", signup);

route.post("/login", login);

module.exports = route;
