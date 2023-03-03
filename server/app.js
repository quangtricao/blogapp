const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger");

info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((e) => {
    error("error connection to MongoDB:", e.message);
  });

app.use(express.static("build"));   // path: "/"
const path = require("path");
app.use("/login", express.static(path.join(__dirname, "build")));
app.use("/blogs/:id", express.static(path.join(__dirname, "build")));
app.use("/users", express.static(path.join(__dirname, "build")));
app.use("/users/:id", express.static(path.join(__dirname, "build")));

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
