const express = require("express");
const { login, signUp,logOut } = require("./auth.controller");

const router = express.Router();
router.get("/login", login);
router.post("/signup", signUp);
router.post("/logout", logOut);
module.exports = router;
