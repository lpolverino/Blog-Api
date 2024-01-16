var express = require('express');
var router = express.Router();

const postController = require("../controllers/postController")

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

router.post('/posts', (req, res) => {
    return res.send('POST HTTP method on post resource');
});
  
router.put('/posts/:postId', (req, res) => {
    return res.send(
      `PUT HTTP method on post/${req.params.postId} resource`,
    );
});
  
router.delete('/posts/:postId', (req, res) => {
    return res.send(
      `DELETE HTTP method on post/${req.params.postId} resource`,
    );
});

router.get('/posts/:postId/comments', (req,res) =>{
    return res.send(`GET HTTP method on posts/${req.params.postId}/commets resource`)
})

router.get('/posts/:postId/comments/:commentId', (req,res) =>{
    return res.send(`GET HTTP method on posts/${req.params.postId}/commets/${req.params.commentId} resource`)
})

router.post('/posts/:postId/comments', (req,res) =>{
    return res.send(`POST HTTP method on posts/${req.params.postId}/commets resource`)
})

router.put('/posts/:postId/comments/:commentId', (req,res) =>{
    return res.send(
        `PUT HTTP method on posts/${req.params.postId}/commets/${req.params.commentId} resource`
    )
})

router.delete('/posts/:postId/comments/:commentId', (req,res) =>{
    return res.send(
        `DELETE HTTP method on posts/${req.params.postId}/commets/${req.params.commentId} resource`
    )
})

module.exports = router;