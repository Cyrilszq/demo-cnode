var path = require('path');
var assert = require('assert');
var request = require('supertest');
var User = require('../proxy').User;
var app = require('../app');
describe('signup',function () {
    describe('POST /signup',function () {
        var agent = request.agent(app);//persist cookie when redirect
        // beforeEach(function (done) {
        //     User.addUser({
        //         name:'test2',
        //         password:'123456',
        //         avatar:''
        //     }).then(function () {
        //         done();
        //     }).catch(done)
        // });


        it('wrong name', function(done) {
            agent
                .post('/signup')
                .type('form')
                // .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: '' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/名字请限制在 1-10 个字符/));
                    done();
                });
        });

        it('duplicate name', function(done) {
            agent
                .post('/signup')
                .type('form')
                .field({ name: 'test1',  password: '123456', repassword: '123456' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/用户名已被占用/));
                    done();
                });
        });

    })
});