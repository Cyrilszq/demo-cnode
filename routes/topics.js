var express = require('express');
var router = express.Router();
var Topic = require('../proxy').Topic;
var User = require('../proxy').User;
var Comment = require('../proxy').Comment;
var marked = require('marked');
var checkLogin = require('../middlewares/check').checkLogin;
var xssfilter = require('../utils').xssfilter;
var moment = require('moment');

// GET /topic/create 发布话题页
router.get('/create', checkLogin, function (req, res, next) {
    res.render('edit', {title: '发表话题', topic: {}})
});

//POST /topic/edit
router.post('/edit/:id', checkLogin, function (req, res, next) {
    res.render('edit', {
        title: '编辑话题',
        topic: {
            id: req.params.id,
            topicTitle: req.body.title,
            content: req.body.content,
            tabValue: req.body.tabValue
        }
<<<<<<< HEAD
=======

>>>>>>> 31b3936a22d13b1b9c40c5a50302bbafbacd60af
    })
});

// POST /topic/create 处理上传的话题
router.post('/create', checkLogin, function (req, res, next) {
    var tab = req.body.tab;
    var title = xssfilter(req.body.title);
    var content = xssfilter(req.body.content);
    var id = req.body.id
    //校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
        if (title.length < 5) {
            throw new Error('标题字数需5字以上');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var topic = {
        author: req.session.user,
        title: title,
        originContent: content,
        content: marked(content),
        tab: tab,
        pv: 0
    };

    if (id) {
        Topic.findAndUpdate(id, topic)
            .then(function () {
                res.redirect('/topic/' + id)
            })
            .catch(next)
    } else {
        Promise.all([Topic.addTopic(topic), User.incScore(req.session.user._id, 20)])
            .then(function ([_topic, user]) {
                req.session.user.score = user.score;
                res.redirect('/topic/' + _topic._id)
            })
            .catch(next);
    }
});

// GET /topic/:id 根据id渲染具体话题内容页
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    var _topic;
<<<<<<< HEAD
    var isCollect = false;
=======
>>>>>>> 31b3936a22d13b1b9c40c5a50302bbafbacd60af
    if (id === 'index.js.map' || id.length !== 24) return next(new Error('该话题不存在'));

    Topic.getTopicById(id)
        .then(function (topic) {
            if (!topic) {
                next(new Error('该话题不存在'))
            } else {
                _topic = topic;
<<<<<<< HEAD
                return Promise.all([Comment.getCommentsByTopicId(id),
                    User.getUserByName(topic.author.name),
                    User.getUserByName(req.session.user.name)
                ])
            }
        })
        .then(function ([comments, author, user]) {
            user.collect.some(function (i) {
                if (i.topicId == _topic._id) {
                    isCollect = true;
                    return true
                }
            });
=======
                return Promise.all([Comment.getCommentsByTopicId(id), User.getUserByName(topic.author.name)])
            }
        })
        .then(function ([comments, user]) {
>>>>>>> 31b3936a22d13b1b9c40c5a50302bbafbacd60af
            res.render('topic', {
                title: _topic.title,
                topic: _topic,
                date: moment(_topic.create_at).format('YYYY-MM-DD'),
                comments: comments,
<<<<<<< HEAD
                score: author.score,
                isCollect: isCollect
=======
                score: user.score,
>>>>>>> 31b3936a22d13b1b9c40c5a50302bbafbacd60af
            })
        })
        .catch(next)
});

// POST /topic/:topic_id/reply 处理上传的回复
<<<<<<< HEAD
router.post('/:topic_id/reply', checkLogin, function (req, res, next) {
=======
router.post('/:topic_id/reply', function (req, res, next) {
>>>>>>> 31b3936a22d13b1b9c40c5a50302bbafbacd60af
    var content = req.body.content;
    var topic_id = xssfilter(req.params.topic_id);
    var comment = {
        topic_id: topic_id,
        author: req.session.user,
        content: xssfilter(marked(content))
    };
    Promise.all([
        Comment.addComment(comment),
        Topic.incComment(topic_id),
        User.incScore(req.session.user._id, 5),
    ]).then(function ([c, t, user]) {
        req.session.user.score = user.score;
        res.redirect('/topic/' + topic_id)
    }).catch(next)
});

// POST /topic/addCollect 处理收藏请求
<<<<<<< HEAD
router.post('/addCollect', checkLogin, function (req, res, next) {
    User.addCollect(req.session.user._id, req.body)
        .then(function (user) {
            res.redirect('/topic/' + req.body.topicId)
        });

});
// POST /topic/delCollect 处理取消收藏请求
router.post('/delCollect', checkLogin, function (req, res, next) {
    User.delCollect(req.session.user._id, req.body.topicId)
        .then(function (user) {
            res.redirect('/topic/' + req.body.topicId)
        });

});
=======
// router.post('/addCollect',function (req, res, next) {
//     console.log(req.body.collectTopicId)
//     User.addCollect(req.session.user._id,req.body.collectTopicId)
//         .then(function (user) {
//             res.sendStatus(200)
//         });
//
// });
>>>>>>> 31b3936a22d13b1b9c40c5a50302bbafbacd60af

module.exports = router;