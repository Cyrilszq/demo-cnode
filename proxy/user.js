var User = require('../models').User;

exports.addUser = function (data) {
    var user = new User(data);
    return user.save(); //返回一个promise对象
};

exports.getAll = function () {
    return User.find({}).exec();
};

exports.remove = function (name) {
    var query = name ? {name: name} : {};
    return User.remove(query).exec()
};

exports.getUserById = function (id) {
    return User.findOne({_id: id}).exec();  //返回一个promise对象
};

exports.getUserByName = function (name) {
    return User.findOne({name: name}).exec(); //返回一个promise对象
};


exports.addCollect = function (id, collectTopicId) {
    return User.findOneAndUpdate({_id: id}, {$push: {'collect': collectTopicId}}, {new: true}).exec();
};

exports.incScore = function (id, step) {
    return User.findOneAndUpdate({_id: id}, {$inc: {score: step}}, {new: true}).exec();
};

