const Post = require("../models/post")
const Comment = require("../models/comments")
const asyncHandler = require("express-async-handler");

exports.comment_list = asyncHandler(async (req,res,next) => {
    const allPost = await Comment.find({})
    .sort({author:1})
    .exec();

    res.send(allPost)
})

exports.comment_detail = asyncHandler(async (req,res,next) => {
    const comment = await Comment.findById(req.params.commentId).exec()

    if (comment === null){
        const err = new Error("Comment not found");
        err.status = 404;
        return next(err);
    }

    res.send(comment)
})