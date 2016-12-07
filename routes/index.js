const express = require('express');
const router = express.Router();
const Topic = require('../proxy').Topic;

const navtabs = [['all', '全部'], ['good', '精华'], ['share', '分享'], ['ask', '问答'], ['job', '招聘']];
const tabs = {
    'share': '分享',
    'job': '招聘',
    'ask': '问答',
    'good': '精华',
    'all': 'all'
};

// GET index 主页
router.get('/', function (req, res,next) {
    var tab = req.query.tab || 'all';
    var page = req.query.page || 1;
    tab = tabs[tab];

    Promise.all([Topic.getTopicsCount(), Topic.getTopics({tab: tab}, page)])
        .then(function ([topicCount, topics]) {
            var pageRender = {start: 1, end: 0};
            var pageNum;
            // 每页显示15条，根据页数决定如何渲染分页组件
            pageNum = Math.ceil(topicCount / 15);
            if (pageNum <= 5) {
                pageRender.end = pageNum;
            } else {
                pageRender.start = page;
                // 分页组件每次只显示5页，前后显示省略号
                pageRender.end = parseInt(page) + 5
            }
            res.render('index', {
                title: 'cnode',
                topics: topics,
                tabs: navtabs,
                currentTab: req.query.tab || 'all',
                pageRender: pageRender,
                pageNum: pageNum
            })
        })
        .catch(next)
});
module.exports = router;