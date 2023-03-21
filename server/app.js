// packages
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// routes
const AuthRouter = require("./routes/AuthenticationRouter");

require("dotenv").config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", AuthRouter);

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Connected!");
});

module.exports = app;
