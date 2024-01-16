const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content:{type:String, required: true, minLength:3, maxLength:100},
    author:{type:String, required: true, minLength:3, maxLength: 500}
});


// Virtual for author's URL
CommentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/blog/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);