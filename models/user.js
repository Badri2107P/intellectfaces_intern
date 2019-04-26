const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  FirstName: String,
  LastName: String,
  UserName: String,
  Email: String,
  Password: String,
  Role: String
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
