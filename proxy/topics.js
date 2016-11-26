var Topic = require('../models').Topics;

exports.addTopic = function (data) {
    var topic = new Topic(data);
    return topic.save();
};

exports.getTopicById = function (id) {
    return Topic.findOneAndUpdate({_id: id},{$inc: {pv: 1}}).exec();
};

exports.getTopics = function (author) {
    var query = author ? {author: author} : {};
    return Topic.find(query).exec();
}

