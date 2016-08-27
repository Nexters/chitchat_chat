"use strict";

var textCtrl = require('../controller/text');
var userCtrl = require('../controller/user');
var B = require('bluebird');

module.exports = function (io, msg) {
  B.join(textCtrl.saveText(this.uid, this.cid, msg), userCtrl.findUser(this.uid)).then(function (text, user) {
    io.to(this.room).emit('newMsg', user, text);
  }.bind(this)).catch((e) => {
    console.log(e);
    this.emit('errorToCli', 'saving message entry failed');
  });

};