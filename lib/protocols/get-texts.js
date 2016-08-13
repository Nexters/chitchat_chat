"use strict";

var textCtrl = require('../controller/text');

module.exports = function (io, range) {
  textCtrl.getTexts(this.cid, range.start, range.end).then(function (texts) {
    this.emit('history', texts);
  }.bind(this)).catch((e) => {
    this.emit('error', 'saving message entry failed');
  });

};