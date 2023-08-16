const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = async function (req, res) {
  console.log(req.user);
  const post = await Post.create({
    content: req.body.content,

    user: req.user._id,
  });
  if (req.xhr) {
    return res.status(200).json({
        data: {
            post: post
        }, 
        message : 'Post Created!'
    });
  }
  req.flash("success", "Post published!");
  return res.redirect("back");
};

module.exports.destroy = async function (req, res) {
  const post = await Post.findById(req.params.id);
  if (post.user==req.user.id) {
    await post.deleteOne();
    Comment.deleteMany({ post: req.params.id });
    if(req.xhr){
        return res.status(200).json({
            data: {
                post_id: req.params.id
            },
            message: 'Post Deleted '
        });
    }
    req.flash("success", "Post and associated comments deleted!");
    return res.redirect("back");
  } else {
    req.flash("error", "You can not delete Post!");
    return res.redirect("back");
  }
};
