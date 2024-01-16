#! /usr/bin/env node

const bcrypt = require("bcryptjs")


console.log(
    'This script populates some post, comments and a user to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const User = require("./models/user")
  const Post = require("./models/post")
  const Comment = require("./models/comments")

  const users = []
  const posts = []
  const comments = []

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUser();
    await createComments();
    await createPost();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function userCreate(username, password) {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return "bad"
      const user = new User({ username: username, password:hashedPassword});
      await user.save();
      users[0] = user;
      console.log(`Added User: ${username}`);
    });

  }
  
  async function postCreate(index, title, description, author, status, comments) {
  
    const post = new Post({
      title,
      description,
      author,
      published: status,
      comments
    });
  
    await post.save();
    posts[index] = post;
    console.log(`Added Post: ${title}`);
  }
  
  async function commentCreate(index, content, author) {
    const commentDetail = {
      content: content,
      author: author,
    };
  
    const comment = new Comment(commentDetail);
    await comment.save();
    comments[index] = comment;
    console.log(`Added comment: ${content}`);
  }
  
  
  async function createUser() {
    console.log("Adding user");
    await userCreate("lpolverino", "admin");
  }
  
  async function createPost() {
    console.log("Adding post");
    await Promise.all([
      postCreate(0,
        "superAnts",
        "the super ants are everywhere you just need to watch more closely",
        "lpolverino",
        "Published",
        [comments[0],comments[1],comments[2],comments[3]]),
      postCreate(1,
        "Orcas are goodwith people",
        "There isnt any registered attack by a orca to a human in the wild",
        "lpolverino",
        "Published"
        ,[comments[4],comments[5],comments[6],comments[7],comments[8]]),
      postCreate(2,
        "Cool seagulls",
        "the seagull are forgetting how to hunt beacouse they steal the humans food from the streat and dumbster", 
        "lpolverino",
        "Published",
        [comments[8]]),
      postCreate(3,
        "Some cocos can gallop",
        "in the past the cocodriles could gallop easily but many of them evolve to lost this trait",
        "lpolverino",
        "Unpublished",
        [comments[9]]),
    ]);
  }
  
  async function createComments() {
    console.log("Adding comments");
    await Promise.all([
      commentCreate(0,
        "How cool",
        "Margarita12"
      ),
      commentCreate(1,
        "Amazing",
        "OlavSon"
      ),
      commentCreate(2,
        "you are lying",
        "MotorBike Johson"
      ),
      commentCreate(3,
        "In my times we would be scared of those thing",
        "Margarita12"
      ),
      commentCreate(4,
        "lol",
        "Fredericx"
      ),
      commentCreate(5,
        "so true!!",
        "ComStata"
      ),
      commentCreate(6,
        "Radical",
        "OlavSon"
      ),
      commentCreate(7,
        "Cannot believed this",
        "Fasci"
      ),
      commentCreate(8,
        "Hello police?",
        "MotorBike Johson"
      ),
      commentCreate(9,
        "i want some of this craetures in my country",
        "Margarita12"
      ),
    ]);
  }
