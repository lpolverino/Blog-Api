const Post = require("../models/post")
const Comment = require("../models/comments")
const asyncHandler = require("express-async-handler");

exports.post_list = asyncHandler(async (req,res,next) => {
    const allPost = await Post.find({})
    .sort({ date: 1 })
    .populate("comments")
    .exec();

    res.send(allPost)
})

exports.post_detail = asyncHandler(async (req,res,next) => {
    const post = await Post.findById(req.params.postId).populate("comments").exec()

    if (post === null){
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    res.send(post)
})