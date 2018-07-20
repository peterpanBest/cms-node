'use strict'

var xss = require('xss');
var mongoose = require('mongoose');
var Logs = mongoose.model("Logs");
var uuid = require('uuid');
var logsHelper = require("../dbhelper/logsHelper");
var sendMail = require("../../mail");

/**
 * 记录日志
 */
exports.addLog = async (ctx, next) => {
    var apiUrl = xss(ctx.request.body.apiUrl.trim());
    var log = await Logs.findOne({
        apiUrl: apiUrl
    }).exec()
    console.log(log);

    var verifyCode = Math.floor(Math.random() * 10000 + 1)
    console.log(apiUrl);
    if (!log) {
      var accessToken = uuid.v4();
        log = new Logs({
          apiUrl: apiUrl,
          verifyCode: verifyCode,
          accessToken: accessToken
        });
    } else {
        log.verifyCode = verifyCode;
    }

    try {
        log = await log.save()
        ctx.body = {
            success: true
        }
        //发送邮件 sendMail();
    } catch (e) {
        ctx.body = {
            success: false
        }
        return next
    }

}