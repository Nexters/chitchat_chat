"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (io, token, cid) {
  if ("null" === token) {
    this.emit('errorToCli', 'user must login to leave chatroom');
  } else {

    B.join(userCtrl.findUserWithToken(token), chatroomCtrl.findChatroom(cid), function (user, chatroom) {

      let uid = user._id.toString();

      chatroomCtrl.leaveUserFromChatroom(uid, cid).then(function (chatroom) {
        delete this.uid;
        delete this.cid;
        delete this.room;

        this.leave(chatroom._id.toString(), function (err) {

          io.to(chatroom._id.toString()).emit('left', user.nickname);
        }.bind(this));
      }.bind(this)).catch((e) => {
        console.log(e);
        this.emit('errorToCli', 'update chatroom entry failed');
      });

    }.bind(this)).catch((e) => {
      console.log(e);
      this.emit('errorToCli', 'unable to retrieve information');
    });
  }
};