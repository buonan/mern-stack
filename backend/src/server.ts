var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 8080;
const mongo_host = process.env.MONGO_HOST === undefined ? 'localhost' : process.env.MONGO_HOST
const mongo_port = process.env.MONGO_PORT === undefined ? '27017' : process.env.MONGO_PORT
const mongo_root_username = process.env.MONGO_INITDB_ROOT_USERNAME ?? 'root'
const mongo_root_password = process.env.MONGO_INITDB_ROOT_PASSWORD ?? 'example'

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// handle cors
app.use(cors());

// mongodb connection
mongoose.Promise = global.Promise;

// warning: root:password!!
const url = `mongodb://${mongo_root_username}:${mongo_root_password}@${mongo_host}:${mongo_port}`;
console.log(`${url}`)
mongoose.connect(`${url}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log("Connected"))
.catch(err => console.log(err));

// route endpoints
require('./endpoints')(app);

// logging
app.use(function (err, req, res, next) {
  // Do logging and user-friendly error message display
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

