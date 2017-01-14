var xss = require('xss');
var options = {};
var myxss = new xss.FilterXSS(options);
exports.parseDate = function (date) {
    return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDay();
};

exports.xssfilter = function (input) {
    return myxss.process(input);
};