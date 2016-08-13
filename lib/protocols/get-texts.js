"use strict";

var textCtrl = require('../controller/text');

module.exports = function (range) {
  textCtrl.getTexts(this.cid, range.start, range.end).then((texts) => {
    this.emit('history', texts);
  }).catch((e) => {
    this.emit('error', 'saving message entry failed');
  });

};