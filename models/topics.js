var mongoose = require('mongoose');
var marked = require('marked');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: {type: String},
    content: {type: String},
    author: {type: String},
    pv: {type: Number},
    comment: {type: Number, default: 0},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
});



TopicSchema.index({'author.name': 1, update_at: -1});

module.exports = mongoose.model('Topic', TopicSchema);