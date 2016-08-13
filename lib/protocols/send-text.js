"use strict";

var textCtrl = require('../controller/text');

module.exports = function (msg) {
  textCtrl.saveText(this.uid, this.cid, msg).then((text) => {
    this.broadcast.to(this.room).emit('msg', uid, msg);
  }).catch((e) => {
    this.emit('error', 'saving message entry failed');
  });

};