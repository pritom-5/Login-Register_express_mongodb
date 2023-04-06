const express = require("express");
const router = express.Router();
const path = require("path");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/user");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../htmlFiles/login.html"));
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim() || !password || !username) {
      res.status(400);
      throw new Error("Invalid Entry");
    }

    // find if user is in db
    const user = await userModel.findOne({ username });

    if (!user) {
      res.status(400);
      res.redirect("/register");
    }

    if (user.password !== password) {
      console.log(user.password, password);
      res.status(401);
      throw new Error("Invalid password");
    }

    // redirct user to dashboard
    res.redirect("/dashboard");
  })
);
module.exports = router;
