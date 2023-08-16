const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  const post = await Post.findById(req.body.post);
  if (post) {
    Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id,
    })
      .then((comment) => {
        post.comments.push(comment);
        post.save();
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err, "error in creating a comment");
      });
  }
};

module.exports.destroy = async function (req, res) {
  const comment = await Comment.findById(req.params.id);

  if (comment.user == req.user.id) {
    let postId = comment.post;
    comment.deleteOne();
    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
    return res.redirect("back");
  } else {
    return res.redirect("back");
  }
}
