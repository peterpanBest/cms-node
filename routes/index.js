var router = require('koa-router')();

// router.get('/', function(next) {
//   this.render('login', {});
// });

router.get('/', (ctx, next) => {
  ctx.render('login');
})

router.get('/login', function(ctx, next) {
  ctx.render('login', {
    users: [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }]
  });
});

module.exports = router;
