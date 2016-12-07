var express = require('express');
var router = express.Router();
var Topic = require('../proxy').Topic;
var Comment = require('../proxy').Comment;
var marked = require('marked');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /topic/create 发布话题页
router.get('/create', checkLogin, function (req, res, next) {
    res.render('edit', {title: '发表话题'})
});

// POST /topic/create 处理上传的话题
router.post('/create', checkLogin, function (req, res, next) {
    var tab = req.body.tab;
    var title = req.body.title;
    var content = req.body.content;

    //校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
        if (title.length < 10) {
            throw new Error('标题字数需10字以上');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var topic = {
        author: req.session.user,
        title: title,
        content: marked(content),
        tab: tab,
        pv: 0
    };

    Topic.addTopic(topic)
        .then(function (result) {
            res.redirect('/topic/' + result._id)
        })
        .catch(next)
});

// GET /topic/:id 根据id渲染具体话题内容页
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    var _topic;
    if (id === 'index.js.map' || id.length !== 24) return;
    Topic.getTopicById(id)
        .then(function (topic) {
            if (!topic) {
                next(new Error('该话题不存在'))
            } else {
                _topic = topic;
                return Comment.getCommentsByTopicId(id)
            }
        })
        .then(function (comments) {
            res.render('topic', {
                title: _topic.title,
                topic: _topic,
                comments: comments
            })
        })
        .catch(function (error) {
            console.error(error)
        })
});

// POST /topic/:topic_id/reply 处理上传的回复
router.post('/:topic_id/reply', function (req, res, next) {
    var content = req.body.content;
    var topic_id = req.params.topic_id;
    var comment = {
        topic_id: topic_id,
        author: req.session.user,
        content: marked(content),
    };

    Comment.addComment(comment)
        .then(function () {
            return Topic.incComment(topic_id)
        })
        .then(function () {
            res.redirect('/topic/' + topic_id)
        })
        .catch(next)
});

module.exports = router;