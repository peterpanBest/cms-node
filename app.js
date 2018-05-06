'use strict'
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const db = 'mongodb://localhost/test';

/**
 * 获取数据库表对应的js对象所在的路径
 */
const models_path = path.join(__dirname, '/app/models');

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 */
var walk = function(modelPath) {
  fs.readdirSync(modelPath).forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
};
walk(models_path);

/////////////////////////////////////////////////////////////////
var logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

const session = require('koa-session');
const bodyParser = require('koa-bodyparser')

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var router = require('./routes/router')();//api router file

const Koa = require('koa');
const render = require('koa-art-template');
const app = new Koa();

/**
 * mongoose连接数据库
 */
mongoose.Promise = require('bluebird');
mongoose.connect(db);

require('babel-register');
app.keys = ['zhangivon'];

// error handler
onerror(app);

// global middlewares
// app.use(views('views', {
//   root: __dirname + '/views',
//   default: 'jade'
// }));

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(bodyParser());
app.use(json());
app.use(logger());
app.use(session(app));

// app.use(function*(next) {
//   json()
//   logger()
//   session(app)
//   bodyParser()
//   yield next;
// });


// app.use(function *(next){
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(register.routes(), register.allowedMethods());
//api 路由
app.use(router.routes()).use(router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
