"use strict";

var textCtrl = require('../controller/text');

module.exports = function (io, msg) {
  textCtrl.saveText(this.uid, this.cid, msg).then(function (text) {
    io.to(this.room).emit('newMsg', this.uid, text);
  }.bind(this)).catch((e) => {
    console.log(e);
    this.emit('errorToCli', 'saving message entry failed');
  });

};