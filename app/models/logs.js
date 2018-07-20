'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogsSchema = new Schema({
    apiUrl: {
        unique: true,
        type: String
    },
    verifyCode: String,
    verified: {
        type: Boolean,
        default: false
    },
    accessToken: String,
    meta: {
        createAt: {
            type: Date,
            dafault: Date.now()
        },
        updateAt: {
            type: Date,
            dafault: Date.now()
        }
    }
})

// Defines a pre hook for the document.
LogsSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});


/**
 * 定义模型Logs
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 数据库中的集合名称, 不存在会创建.
var Logs = mongoose.model("Logs", LogsSchema);

module.exports = Logs