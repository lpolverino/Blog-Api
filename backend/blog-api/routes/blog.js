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

router.get('/posts/:postId/comments', postController.get_post_comments)

router.get('/posts/:postId/comments/:commentId',postController.get_post_comment)

router.post('/posts/:postId/comments', postController.post_comment)

module.exports = router;