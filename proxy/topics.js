var Topic = require('../models').Topics;

exports.addTopic = function (data) {
    var topic = new Topic(data);
    return topic.save();
};

exports.getTopicById = function (id) {
    return Topic.findOneAndUpdate({_id: id}, {$inc: {pv: 1}},{new: true}).exec();
};

exports.getTopics = function (options, page) {
    var query = options ? options : {};
    if (query.tab === 'all') query = {};
    return Topic.find(query).skip((page - 1) * 15).sort('-updated_at').limit(15).exec();
};

exports.getTopicsCount = function () {
    return Topic.count()
};

exports.incComment = function (id) {
    return Topic.findOneAndUpdate({_id: id}, {$inc: {comment: 1}},{new: true}).exec()
};

exports.getAll = function () {
    return Topic.find({}).exec()
};

