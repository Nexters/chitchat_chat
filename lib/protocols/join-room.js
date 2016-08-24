"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (io, token, cid) {
  if ("null" === token) {
    this.emit('errorToCli', 'user must login to join chatroom');
  } else {

    B.join(userCtrl.findUserWithToken(token), chatroomCtrl.findChatroom(cid), function (user, chatroom) {
      let uid = user._id.toString();
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
          console.log(e);
          this.emit('errorToCli', 'update chatroom entry failed');
        });
      } else {
        this.emit('errorToCli', 'not matching gender');
      }
    }.bind(this)).catch((e) => {
      console.log(e);
      this.emit('errorToCli', 'unable to retrieve information');
    });
  }
};