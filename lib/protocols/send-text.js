"use strict";

var textCtrl = require('../controller/text');

module.exports = function (msg) {
  textCtrl.saveText(this.socket.uid, this.socket.cid, msg).then((text) => {
    this.socket.broadcast.to(this.socket.room).emit('msg', uid, msg);
  }).catch((e) => {
    this.socket.emit('error', 'saving message entry failed');
  });

};