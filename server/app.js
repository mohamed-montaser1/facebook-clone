// packages
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
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

// cloudinary & multer

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage });

app.post("/api/upload-image", upload.single("image"), (req, res) => {
  res.json({ url: req.file.path });
});

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Connected!");
});

module.exports = app;
