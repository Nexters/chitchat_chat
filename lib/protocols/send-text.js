"use strict";

var textCtrl = require('../controller/text');

module.exports = function (msg) {
  textCtrl.saveText(this.uid, this.cid, msg).then(function (text) {
    this.emit('newMsg', this.uid, text);
    this.to(this.room).emit('newMsg', this.uid, text);
  }.bind(this)).catch((e) => {
    this.emit('error', 'saving message entry failed');
  });

};