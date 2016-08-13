"use strict";

var textCtrl = require('../controller/text');
var io = require('socket.io');

module.exports = function (msg) {
  textCtrl.saveText(this.uid, this.cid, msg).then(function (text) {
    io.to(this.room).emit('newMsg', this.uid, text);
  }.bind(this)).catch((e) => {
    this.emit('error', 'saving message entry failed');
  });

};