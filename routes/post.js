const Express = require("express");
const router = Express.Router();
const Post = require("../models/post.js");
const passport = require("passport");
const passportjwt = require("../middlewares/passport");
const bodyParser = require("body-parser");
const app = Express();
const isEmpty = require("../utils/empty");
app.use(bodyParser.json());

var postid = 1;

router.get("/post", (req, res) => {
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
      // console.log(err);
      res.status(404).json({ message: "Post Not Added", error: err });
    });
});


router.get("/post/:id", (req, res) => {
  Post.find({ post_id: req.params.id })
    .exec()
    .then(docs => {
      if (docs) {
        res.status(201).json(docs);
      } else {
        res.status(404).json({ message: "No post found" });
      }
    })
    .catch(err => {
      // console.log(err);
      res.status(404).json({ message: "Post Not Added", error: err });
    });
});

router.post(
  "/post/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const PostTemp = new Post({
      post_id: postid++,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.body.author,
      posted_on: new Date(),
      updated_on: new Date()
    });
    PostTemp.save()
      .then(res.status(200).json({ message: "Post Added" }))
      .catch(err => {
        res.status(404).json({ message: "Post Not Added", error: err });
      });
  }
);

router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.deleteOne({ post_id: req.params.id })
      .exec()
      .then(err => {
        if (err.deletedCount == "1") {
          res.status(200).json({ message: "Post Deleted" });
        } else {
          console.log(err);
          res.status(404).json({ message: "Post Not Deleted", error: err });
        }
      })
      .catch(err =>
        res.status(404).json({ message: "Post Not Deleted", error: err })
      );
  }
);

router.put(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const UpdatedFields = {};
    Object.keys(req.body).forEach(key => {
      if (!isEmpty(req.body[key])) {
        UpdatedFields[key] = req.body[key];
      }
    });
    delete UpdatedFields.post_id;
    delete UpdatedFields.posted_on;
    delete UpdatedFields.author;
    UpdatedFields.updated_on = new Date();
    // console.log(UpdatedFields);

    Post.updateOne({ post_id: req.params.id }, UpdatedFields)
      .exec()
      .then(result => {
        if (result.nModified > 0) {
          res.status(200).json({ message: "Post Updated" });
        } else {
          //   console.log(result);
          res.status(404).json({ message: "Post Not Updated", error: result });
        }
      })
      .catch(err => {
        //console.log(err);
        res.status(404).json({ message: "Post Not Updated", error: err });
      });
  }
);

module.exports = router;
