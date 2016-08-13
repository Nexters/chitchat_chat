"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (uid, cid) {
  B.join(userCtrl.findUser(uid), chatroomCtrl.findChatroom(cid), (user, chatroom) => {
    // check gender
    if (chatroom.targetGender === user.gender || 'both' === chatroom.targetGender) {
      chatroomCtrl.enterUserIntoChatroom(uid, cid).then((chatroom) => {
        this.uid = uid;
        this.cid = cid;
        this.room = chatroom.address;
        
        this.join(chatroom.address);
        this.broadcast.to(chatroom.address).emit('joined', user.nickname);
      }).catch((e) => {
        this.emit('error', 'update chatroom entry failed');
      });
    } else {
      this.emit('error', 'not matching gender');
    }
  }).catch((e) => {
    this.emit('error', 'unable to retrieve information');
  });
};