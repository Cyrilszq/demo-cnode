module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index',{title:'cnode'})
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
};