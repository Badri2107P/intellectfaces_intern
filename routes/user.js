var Express = require("express");
const router = Express.Router();

router.get("/user", (req, res) => {
  console.log(req);
  return res.send(Object.values(req));
});

router.get("/user/add", (req, res) => {
  var User = require("../models/user.js");
  const UserTemp = new User({
    UserName: req.query.name,
    Password: req.query.password
  });

  UserTemp.save(function(err) {
    if (err) return handleError(err);
    res.send("User Added");
  });
});
module.exports = router;
