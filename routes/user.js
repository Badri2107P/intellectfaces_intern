var Express = require("express");
const router = Express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportjwt = require("../middlewares/passport");

router.post("/signup", (req, res, next) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 0) {
        res.status(500).json({ message: "User already present", doc: user });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) res.status(500).json({ error: err });
          else {
            const user = new Users({
              email: req.body.email,
              password: hash
            });
            user.save(err => {
              if (err) res.status(500).json({ error: err });
              res.send("User Added");
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res) => {
  Users.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Authentication failed"
            });
          }
          if (result) {
            var token = jwt.sign({ _id: user._id, email: user.email }, "badri");
            res.status(200).json({
              message: "Login Success",
              token: token
            });
          } else {
            res.status(401).json({
              message: "Authentication failed"
            });
          }
        });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
