"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (uid, cid) {
  B.join(userCtrl.findUser(userId), chatroomCtrl.findChatroom(cid), (user, chatroom) => {

    chatroomCtrl.leaveUserFromChatroom(uid, cid).then((chatroom) => {
      delete this.socket.uid;
      delete this.socket.cid;
      delete this.socket.room;

      this.socket.broadcast.to(chatroom.address).emit('left', user.nickname);
      this.socket.leave(chatroom.address);
    }).catch((e) => {
      this.socket.emit('error', 'update chatroom entry failed');
    });

  }).catch((e) => {
    this.socket.emit('error', 'unable to retrieve information');
  });
};