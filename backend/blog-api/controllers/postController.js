const Post = require("../models/post")
const Comment = require("../models/comments")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.post_list = asyncHandler(async (req,res,next) => {
    const allPost = await Post.find({})
    .sort({ date: 1 })
    .populate("comments")
    .exec();

    const publishedPosts = allPost.filter(post => post.published === "Published")
    res.send(publishedPosts)
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

    res.json(post.comments)
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

    res.json(comment)
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
                res.json(comment)
            }catch (error){
                await session.abortTransaction();
                session.endSession();
                throw error; 
            }
          }
    })
]

exports.post_post = [
    body("title", "invalid title Lenght")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
    body("content", "invalid content lenght")
    .trim()
    .isLength({ min: 3, max: 500 })
    .escape(),
    body("author", "invalid author Leght")
    .trim()
    .isLength({ min: 3, max: 50 })
    .escape(),
    body("date", "incorrect date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
    body("published" , "invalid published value")
    .trim()
    .isIn(["Published","Unpublished"])
    .escape(),
    asyncHandler( async (req,res,next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(errors.errors[0].msg);
            err.status = 400;
            return next(err);
          } else {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                date: req.body.date,
                comments: [],
                published: req.body.published
            })
            await post.save()
            res.json(post)
          }
    })
]

exports.update_post = [
    body("published", "invalid published value")
    .trim()
    .isIn(["Published","Unpublished"])
    .escape(),
    asyncHandler( async (req,res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(errors.errors[0].msg);
            err.status = 400;
            return next(err);
          } else {

            const post = await Post.findById(req.params.postId).exec()


            if(post === null){
                const err = new Error("Post not found");
                err.status = 404;
                return next(err);
            }

            const newPost = new Post({
                ...post,
                _id: req.params.postId,
                published: req.body.published
            })

            const updatedPost = await Post.findByIdAndUpdate(req.params.postId, newPost, {})
            res.json(updatedPost)
          }
    })
]

exports.delete_post = asyncHandler( async (req,res,next) => {

    const post = await Post.findById(req.params.postId)
    
    if(post === null){
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    if(post.comments.length > 0){
        const err = new Error("Post has undeleted comments")
        err.status = 400
        return next(err)
    }
    await Post.findByIdAndDelete(req.body.postId);
    res.json({deleted:req.params.postId});
})

exports.delete_comment = asyncHandler( async (req,res,next) => {

    const post = await Post.findById(req.params.postId)
    
    if(post === null){
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }

    const comment = await Comment.findById(req.params.CommentId)

    if(comment === null){
        const err = new Error("Comment not found");
        err.status = 404;
        return next(err);
    }

    await Comment.findByIdAndDelete(req.body.commentId);
    res.json({deleted:req.params.commentId});
})