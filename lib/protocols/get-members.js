"use strict";

var chatroomCtrl = require('../controller/chatroom');

module.exports = function (cid) {
  chatroomCtrl.findChatroom(cid).then((chatroom) => {

      this.socket.emit('participants', chatroom.participants);

  }).catch((e) => {
    this.socket.emit('error', 'unable to retrieve chatroom ' + cid + 'information');
  });
};