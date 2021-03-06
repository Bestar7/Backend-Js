var express = require("express");
var logger = require("morgan");

var questionRouter = require("./routes/questions");
var userRouter = require("./routes/users");
var salonRouter = require("./routes/salons");


var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/questions", questionRouter);
app.use("/users", userRouter);
app.use("/salons", salonRouter);


module.exports = app;
