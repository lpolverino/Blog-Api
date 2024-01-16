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
    //jwt sign
    // TODO: i really dont know where is the user
    JsonWebTokenError.sign({user:req.user}, 'orcasorcanidas', (err, token) =>{
      res.json({
        token
      });
    });
  }
);

module.exports = router;
