var router = require('koa-router')();

router.prefix('/users');

router.get('/bar', function *(next) {
  this.body = 'this is a users/bar response!';
});

module.exports = router;
