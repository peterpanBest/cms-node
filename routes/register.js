var router = require('koa-router')();

router.get('/register', function(next) {
  this.render('../views/pages/register', {
    users: [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }]
  });
});

module.exports = router;