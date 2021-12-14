var express = require("express");
var logger = require("morgan");

var questionRouter = require("./routes/questions");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/questions", questionRouter);

module.exports = app;
