const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const connectDb = require("./db/db");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

connectDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/htmlFiles/home.html"));
});

app.use("/login", require("./routes/login"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/register", require("./routes/register"));

app.use(errorHandler);

app.listen(5000, () => console.log("server started"));
