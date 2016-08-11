"use strict";

var textCtrl = require('../controller/text');

module.exports = function (range) {
  textCtrl.getTexts(this.socket.cid, range.start, range.end).then((texts) => {
    this.socket.emit('history', texts);
  }).catch((e) => {
    this.socket.emit('error', 'saving message entry failed');
  });

};