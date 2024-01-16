const express = require('express');
const router = express.Router();
const passport = require("passport")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/log-in', function(req,res,next) {
  res.render('log_in_form')
})

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = router;
