var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var config = require("./config");

smtpTransport = nodemailer.createTransport({
  service: config.email.service,
  host: config.email.host,
  secure: true,
  port: config.email.host.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */

var mailOptions = {
  from: "", // sender address
  to: "", // list of receivers
  subject: "Hello", // Subject line
  text: "Hello world ✔", // plaintext body
  html: "<b>Hello world ✔</b>" // html body
};
var sendMail = function(recipient, subject, html) {
  smtpTransport.sendMail(
    {
      from: config.email.user,
      to: recipient,
      subject: subject,
      html: html
    },
    function(error, response) {
      if (error) {
        console.log(error);
      }
      console.log("发送成功");
    }
  );
};

module.exports = sendMail;
