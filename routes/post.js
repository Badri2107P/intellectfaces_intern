const Express = require("express");
const router = Express.Router();
const bodyParser = require("body-parser");

const app = Express();

app.use(bodyParser.json());
const Post = require("../models/post.js");
router.get("/post/view", (req, res) => {
  Post.find()
    .exec()
    .then(docs => {
      if (docs) {
        res.status(201).json(docs);
      } else {
        res.status(404).json({ message: "No post found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ message: "Post Not  Added", error: err });
    });
});

router.get("/post/view/:id", (req, res) => {
  Post.find({ _id: req.params.id })
    .exec()
    .then(docs => {
      if (docs) {
        res.status(201).json(docs);
      } else {
        res.status(404).json({ message: "No post found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ message: "Post Not  Added", error: err });
    });
});

router.post("/post/add", (req, res) => {
  const PostTemp = new Post({
    id: req.body.Id,
    Title: req.body.Title,
    Content: req.body.Content,
    Tags: req.body.Tags,
    Author: req.body.Author,
    PostedOn: new Date()
  });
  PostTemp.save()
    .then(res.status(200).json({ message: "Post Added" }))
    .catch(err => {
      res.status(404).json({ message: "Post Not  Added", error: err });
    });
});

module.exports = router;
