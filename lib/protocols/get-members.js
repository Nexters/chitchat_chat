"use strict";

var chatroomCtrl = require('../controller/chatroom');

module.exports = function (cid) {
  chatroomCtrl.findChatroom(cid).then((chatroom) => {

    this.emit('participants', chatroom.participants);

  }).catch((e) => {
    this.emit('error', 'unable to retrieve chatroom ' + cid + 'information');
  });
};