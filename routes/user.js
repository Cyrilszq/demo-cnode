var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var User = require('../proxy').User;
var Topic = require('../proxy').Topic;
var Comment = require('../proxy').Comment;
<<<<<<< HEAD
var checkLogin = require('../middlewares/check').checkLogin;
var moment = require('moment');
router.get('/:name', checkLogin, function (req, res, next) {
    var name = req.params.name;
    Promise.all([
        Topic.getTopics({'author.name': name}),
        Comment.getComments(name),
        User.getUserByName(name)
    ]).then(function ([topics, comments, user]) {
        user.createAt = moment(user.create_at).format('YYYY-MM-DD');
        res.render('user', {title: '个人主页', topics: topics, comments: comments, user: user})
=======
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
>>>>>>> 31b3936a22d13b1b9c40c5a50302bbafbacd60af
    })
});

module.exports = router;