var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var cors = require("cors");
require('dotenv').config();

console.log("mongoose-------", process.env.PORT);

// mongoose.connect(`mongodb://127.0.0.1:27017/eventease_db`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(`mongodb://127.0.0.1:27017/eventease_db`);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to database");
});
// const cors = require('cors');

// mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   // we're connected!
//   console.log("connected to database");
// });

var indexRouter = require("./app/routes/index.routes");
var adminRoutes = require('./app/routes/admin.routes');

var app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static("public"));
app.use("/", indexRouter);
app.use('/admin', adminRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;