var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://badri:0cNUCpJiG9wHhlO7@intellectfaces-ujsa8.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true },
  function(err, db) {
    if (err) {
      console.log(
        "Unable to connect to the server. Please start the server. Error:",
        err
      );
    } else {
      console.log("Connected to Server successfully!");
    }
  }
);

app.use(require("./routes/index"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.listen(80, function(res, req) {
  console.log("Server Started");
});
