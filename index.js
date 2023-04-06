const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const connectDb = require("./db/db");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const session = require("express-session");
const authHandler = require("./middleware/authHandler");
const logout = require("./routes/logout");

connectDb();

// mongodb session store

// cookie session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/home.css", (req, res) => {
  res.sendFile(path.join(__dirname, "/htmlFiles/home.css"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/htmlFiles/home.html"));
});

app.use("/login", require("./routes/login"));

app.use("/dashboard", authHandler, require("./routes/dashboard"));

app.use("/register", require("./routes/register"));

app.use(errorHandler);

app.post("/logout", logout);

app.listen(5000, () => console.log("server started"));
