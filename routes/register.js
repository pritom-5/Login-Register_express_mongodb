const express = require("express");
const router = express.Router();
const path = require("path");
const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../htmlFiles/register.html"));
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    if (!username.trim() || !password.trim() || !email.trim) {
      res.status(400);
      throw new Error("all fields are mandatory");
    }

    const existingUser = await userModel.findOne({ email });

    if (!!existingUser) {
      res.status(400);
      throw new Error("user already exists");
    }

    const returnedUser = await userModel.create({ username, password, email });

    console.log(returnedUser);
    res.redirect("/");
  })
);
module.exports = router;
