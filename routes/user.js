var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var User = require('../proxy').User;
var Topic = require('../proxy').Topic;
var Comment = require('../proxy').Comment;
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var utils = require('../utils');

router.get('/:name', function (req, res, next) {
    var name = req.params.name;


    Promise.all([
        Topic.getTopics({'author.name':name}),
        Comment.getComments(name),
        User.getUserByName(name)
    ]).then(function ([topics,comments,user]) {
        user.createAt = utils.parseDate(user.create_at);
        res.render('user',{title:'个人主页',topics:topics,comments:comments,user:user})
    })
});

module.exports = router;