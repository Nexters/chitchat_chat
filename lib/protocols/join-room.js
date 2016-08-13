"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (io, uid, cid) {
  B.join(userCtrl.findUser(uid), chatroomCtrl.findChatroom(cid), function (user, chatroom) {
    // check gender
    if (chatroom.targetGender === user.gender || 'both' === chatroom.targetGender) {
      chatroomCtrl.enterUserIntoChatroom(uid, cid).then(function (chatroom) {
        this.uid = uid;
        this.cid = cid;
        this.room = chatroom.address;

        this.join(this.room, function (err) {
          io.to(this.room).emit('joined', user.nickname);
        }.bind(this));
      }.bind(this)).catch((e) => {
        this.emit('error', 'update chatroom entry failed');
      });
    } else {
      this.emit('error', 'not matching gender');
    }
  }.bind(this)).catch((e) => {
    this.emit('error', 'unable to retrieve information');
  });
};