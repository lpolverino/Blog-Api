const Post = require("../models/post")
const Comment = require("../models/comments")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


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

exports.get_post_comments = asyncHandler( async (req, res,next) => {
    const post = await Post.findById(req.params.postId, "comments").populate("comments").exec()

    if (post === null){
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    res.send(post.comments)
})

exports.get_post_comment = asyncHandler(async ( req, res, next) => {
    const post = await Post.findById(req.params.postId, "comments").populate("comments").exec()

    if (post === null){
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    const comment = await Comment.findById(req.params.commentId).exec()

    if (comment === null){
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    res.send(comment)
})

exports.post_comment = [
    body("content")
    .trim()
    .isLength({ min: 3, max:500 })
    .withMessage("invalid lenght"),
    body("author")
    .trim()
    .isLength({ min: 3, max:100 })
    .withMessage("invalid lenght"),
    asyncHandler( async (req,res,next)=> {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const err = new Error("invalid length");
            err.status = 400;
            return next(err);
          } else {
            const comment = new Comment({content: req.body.content, author: req.body.author});

            const post = await Post.findById(req.params.postId).populate("comments").exec()

            if(post === null){
                const err = new Error("Post not found");
                err.status = 404;
                return next(err);
            }

            const session = await Post.startSession();
            session.startTransaction()
            try{
                const opts = { session };
                            
                comment.save(opts)

                const updatePost ={
                    ...post,
                    comments: post.comments.push(comment)
                }

                const updatedPost = await Post.findByIdAndUpdate(req.params.postId, updatePost, {}, opts);
                await session.commitTransaction();
                session.endSession();
                res.send(`author : ${comment.author} content ${comment.content} was sucefull saved in post ${updatePost._id}`)
            }catch (error){
                await session.abortTransaction();
                session.endSession();
                throw error; 
            }
          }
    })
]