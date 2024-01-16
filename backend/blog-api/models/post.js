const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title:{type:String, requied:true, maxLength:100, minLenght:3},
  content:{type:String, minLenght:3, maxLength:500},
  author:{type:String, requied:true, minLenght:3, maxLength:50},
  date:{type:Date, default: Date.now},
  comments:[{type:Schema.Types.ObjectId, ref:"Comment"}],
  published:{type:String, requied:true,
    enum:["Published","Unpublished"], default:"Unpublished"},
});


// Virtual for author's URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/blog/post/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
