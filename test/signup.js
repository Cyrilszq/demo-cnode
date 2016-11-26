var path = require('path');
var assert = require('assert');
var request = require('supertest');
var User = require('../proxy').User;
var app = require('../app');
describe('signup',function () {
    describe('POST /signup',function () {
        var agent = request.agent(app);//persist cookie when redirect
        beforeEach(function (done) {
            User.addUser({
                name:'test1',
                password:'123456',
                avatar:''
            }).then(function () {
                done();
            }).catch(done)
        });
        afterEach(function (done) {
            User.remove({}).exec().then(function () {
                done()
            }).catch(done)
        })



    })
});