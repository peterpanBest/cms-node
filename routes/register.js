var router = require('koa-router')();

router.get('/register', function(ctx, next) {
  ctx.render('../views/pages/register', {});
});

module.exports = router;