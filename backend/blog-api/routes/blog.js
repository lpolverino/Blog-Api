var express = require('express');
const { body, validationResult } = require("express-validator");

var router = express.Router();

const postController = require("../controllers/postController")
const commentController = require("../controllers/commentController")

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.send('Received a GET HTTP method');
});

router.post('/', function(req, res, next) {
    return res.send('Received a POST HTTP method');
});

router.put('/', function(req, res, next) {
    return res.send('Received a PUT HTTP method');
});

router.delete('/', function(req, res, next) {
    return res.send('Received a DELETE HTTP method');
});

router.get('/posts',postController.post_list);

router.get('/posts/:postId',postController.post_detail)

router.get('/comments',commentController.comment_list)

router.get('/comments/:commentId', commentController.comment_detail)

router.get('/posts/:postId/comments', (req,res) =>{
    return res.send(`GET HTTP method on posts/${req.params.postId}/commets resource`)
})

router.get('/posts/:postId/comments/:commentId', (req,res) =>{
    return res.send(`GET HTTP method on posts/${req.params.postId}/commets/${req.params.commentId} resource`)
})

router.post('/posts/:postId/comments', (req,res) =>{
    return res.send(`POST HTTP method on posts/${req.params.postId}/commets resource`)
})
module.exports = router;