const express = require('express');
const router = express.Router();
const passport = require("passport")
const jwt = require("jsonwebtoken")

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
  passport.authenticate("local", {failureRedirect: "/"}),
  (req,res) => {
    jwt.sign({user:req.user}, 'orcasorcanidas', (err, token) =>{
      res.json({
        token
      });
    });
  }
);

router.post('/posts', verifyToken , (req, res) => {
  return res.send('POST HTTP method on post resource');
});

router.put('/posts/:postId',verifyToken, (req, res) => {
  return res.send(
    `PUT HTTP method on post/${req.params.postId} resource`,
  );
});

router.delete('/posts/:postId', verifyToken, (req, res) => {
  return res.send(
    `DELETE HTTP method on post/${req.params.postId} resource`,
  );
});

router.put('/posts/:postId/comments/:commentId', verifyToken, (req,res) =>{
  return res.send(
      `PUT HTTP method on posts/${req.params.postId}/commets/${req.params.commentId} resource`
  )
})

router.delete('/posts/:postId/comments/:commentId', verifyToken,(req,res) =>{
  return res.send(
      `DELETE HTTP method on posts/${req.params.postId}/commets/${req.params.commentId} resource`
  )
})


module.exports = router;
