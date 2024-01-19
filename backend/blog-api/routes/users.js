const express = require('express');
const router = express.Router();
const passport = require("passport")
const jwt = require("jsonwebtoken")

const postController = require("../controllers/postController")
const commentController = require("../controllers/commentController")

const verifyToken = async (req,res,next) =>{
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerTOken = bearer[1];
      req.token = bearerTOken;

      jwt.verify(req.token, 'orcasorcanidas', (err,authData) => {
        if(err){
          res.sendStatus(403)
        }else{
          next();
        }
      })
    } else{
      res.sendStatus(403);
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/log-in', function(req,res,next) {
  res.render('log_in_form')
})

router.post(
  "/log-in",
  passport.authenticate("local"),
  (req,res) => {
    jwt.sign({user:req.user}, 'orcasorcanidas', (err, token) =>{
      res.json({
        token
      });
    });
  }
)
router.get('/posts', verifyToken, postController.get_all_posts)

router.post('/posts', verifyToken , postController.post_post );

router.put('/posts/:postId',verifyToken, postController.update_post);

router.delete('/posts/:postId', verifyToken, postController.delete_post);

router.delete('/posts/:postId/comments/:commentId', verifyToken, postController.delete_comment)


module.exports = router;
