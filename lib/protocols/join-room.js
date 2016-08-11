"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (uid, cid) {
  B.join(userCtrl.findUser(userId), chatroomCtrl.findChatroom(cid), (user, chatroom) => {
    // check gender
    if (chatroom.targetGender === user.gender || 'both' === chatroom.targetGender) {
      chatroomCtrl.enterUserIntoChatroom(uid, cid).then((chatroom) => {
        this.socket.uid = uid;
        this.socket.cid = cid;
        this.socket.room = chatroom.address;
        
        this.socket.join(chatroom.address);
        this.socket.broadcast.to(chatroom.address).emit('joined', user.nickname);
      }).catch((e) => {
        this.socket.emit('error', 'update chatroom entry failed');
      });
    } else {
      this.socket.emit('error', 'not matching gender');
    }
  }).catch((e) => {
    this.socket.emit('error', 'unable to retrieve information');
  });
};