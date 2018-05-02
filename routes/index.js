var router = require('koa-router')();

router.get('/', function(next) {
  this.render('login', {
    users: [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }]
  });
});

router.get('/login', function(next) {
  this.render('login', {
    users: [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }]
  });
});

router.get('/foo', function (next) {
  this.render('index', {
    title: 'Hello World foo!'
  });
});

module.exports = router;
