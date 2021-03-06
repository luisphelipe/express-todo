var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var jwt = require("express-jwt");

require("dotenv").config();

var { attachUser } = require("./middlewares/attachUser.middleware");

var indexRouter = require("./routes/index");
var tasksRouter = require("./routes/tasks");
var authRouter = require("./routes/auth");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(process.env.DATABASE_URI || "mongodb://localhost:27017/todo-app", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use("/", indexRouter);

app.use("/auth", authRouter);

app.use(
  "/tasks",
  jwt({
    secret: "heart-is-valuable",
    userProperty: "token"
  }),
  attachUser,
  tasksRouter
);

module.exports = app;
