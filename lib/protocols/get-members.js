"use strict";

var chatroomCtrl = require('../controller/chatroom');

module.exports = function (io, cid) {
  chatroomCtrl.findChatroom(cid).then( function (chatroom) {

    this.emit('participants', chatroom.participants);

  }.bind(this)).catch((e) => {
    this.emit('error', 'unable to retrieve chatroom ' + cid + 'information');
  });
};