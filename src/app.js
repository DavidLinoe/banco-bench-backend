const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const indexRouter = require("./routes/index");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(indexRouter);
module.exports = app;
