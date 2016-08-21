"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');

module.exports = function (io, token, cid) {
  if ("null" === token) {
    this.emit('error', 'user must login to leave chatroom');
  } else {

    B.join(userCtrl.findUserWithToken(token), chatroomCtrl.findChatroom(cid), function (user, chatroom) {

      let uid = user._id.toString();

      chatroomCtrl.leaveUserFromChatroom(uid, cid).then(function (chatroom) {
        delete this.uid;
        delete this.cid;
        delete this.room;

        this.leave(chatroom.address, function (err) {

          io.to(chatroom.address).emit('left', user.nickname);
        }.bind(this));
      }.bind(this)).catch((e) => {
        this.emit('error', 'update chatroom entry failed');
      });

    }.bind(this)).catch((e) => {
      this.emit('error', 'unable to retrieve information');
    });
  }
};