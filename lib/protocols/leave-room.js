"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (uid, cid) {
  B.join(userCtrl.findUser(userId), chatroomCtrl.findChatroom(cid), (user, chatroom) => {

    chatroomCtrl.leaveUserFromChatroom(uid, cid).then((chatroom) => {
      delete this.uid;
      delete this.cid;
      delete this.room;

      this.broadcast.to(chatroom.address).emit('left', user.nickname);
      this.leave(chatroom.address);
    }).catch((e) => {
      this.emit('error', 'update chatroom entry failed');
    });

  }).catch((e) => {
    this.emit('error', 'unable to retrieve information');
  });
};