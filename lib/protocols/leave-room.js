"use strict";

var userCtrl = require('../controller/user');
var chatroomCtrl = require('../controller/chatroom');
var B = require('bluebird');
var io = require('socket.io');

module.exports = function (uid, cid) {
  B.join(userCtrl.findUser(uid), chatroomCtrl.findChatroom(cid), function (user, chatroom) {

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
};