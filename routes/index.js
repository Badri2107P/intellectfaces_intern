var Express = require("express");
const router = Express.Router();

router.get("/", (req, res) => {
  res.send("HOme");
});

module.exports = router;
