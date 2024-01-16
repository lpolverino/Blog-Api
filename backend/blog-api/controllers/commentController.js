const Comment = require("../models/comments")
const asyncHandler = require("express-async-handler");

exports.post_list = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Author list");
})