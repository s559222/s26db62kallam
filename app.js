var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Costume = require("./models/costume");
var resourceRouter = require("./routes/resource");
var costumesRouter = require('./routes/costume');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


require("dotenv").config();
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var Account = require("./models/account");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/resource", resourceRouter);
app.use('/costumes', costumesRouter);

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

async function recreateDB() {
  await Costume.deleteMany();

  let instance1 = new Costume({
    costume_type: "ghost",
    size: "large",
    cost: 15.4,
  });
  let instance2 = new Costume({
    costume_type: "witch",
    size: "medium",
    cost: 20,
  });
  let instance3 = new Costume({
    costume_type: "zombie",
    size: "small",
    cost: 10,
  });

  await instance1.save();
  await instance2.save();
  await instance3.save();

  console.log("Database seeded");
}

let reseed = true;
if (reseed) {
  recreateDB();
}

module.exports = app;
