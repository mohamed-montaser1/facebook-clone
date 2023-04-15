// packages
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// routes
const AuthRouter = require("./routes/AuthenticationRouter");
const PostsRouter = require("./routes/PostsRouter");
const VerifyEmail = require("./controllers/VeryfyEmailController");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/verify-email/:receiver", VerifyEmail);
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Connected!");
});

module.exports = app;
