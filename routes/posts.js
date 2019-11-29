var express = require('express');
var post = require('../mutual/post');
var router = express.Router();

// new
router.get('/queryUser', function(req, res, next) {
    post.query(req, res, next);
});

router.post('/addUser', function(req, res, next) {
    post.addUser(req, res, next);
});

router.delete('/delUser', function(req, res, next) {
    post.delUser(req, res, next);
});

router.put('/editUser', function(req, res, next) {
    post.editUser(req, res, next);
});

module.exports = router;