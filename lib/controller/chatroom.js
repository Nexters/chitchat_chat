"use strict";

var chatroomModel = require('../model/chatroom')
  , ObjectId = require('mongoose').Types.ObjectId
  , B = require('bluebird')
  ;

var chatroomController = function () { };

var sanitizeObjectId = function (proposedId) {
  try {
    var objID = new ObjectId(proposedId);
    return proposedId === objID.toString();
  } catch (e) {
    return false;
  }
};

chatroomController.prototype.findChatroom = function (chatroomId) {
  return new B((resolve, reject) => {
    chatroomModel.findById(chatroomId).exec()
      .then((chatroom) => {
        if (null !== chatroom) {
          resolve(chatroom);
        } else {
          reject('chatroom not found: ' + chatroomId);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

};

chatroomController.prototype.leaveUserFromChatroom = function (userId, chatroomId) {
  return new B((resolve, reject) => {

    if (!sanitizeObjectId(userId) || !sanitizeObjectId(chatroomId)) {
      return reject('invalid string found in objectID');
    }

    chatroomModel.findById(chatroomId).exec()
      .then((chatroom) => {
        if (null !== chatroom) {
          let index = chatroom.participants.findIndex((p) => { return p.toString() === userId; });

          if (-1 !== index) {
            chatroom.participants.splice(index, 1);
            chatroom.save().then(resolve, reject);
          } else {
            resolve(chatroom);
          }

        } else {
          reject('chatroom not found: ' + chatroomId);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

chatroomController.prototype.enterUserIntoChatroom = function (userId, chatroomId) {
  return new B((resolve, reject) => {

    if (!sanitizeObjectId(userId) || !sanitizeObjectId(chatroomId)) {
      return reject('invalid string found in objectID');
    }
    chatroomModel.findById(chatroomId).exec()
      .then((chatroom) => {
        if ((null !== chatroom) && (!chatroom.participants.find((p) => { return p.toString() === userId; }))) {
          chatroom.participants.push(new ObjectId(userId));

          chatroom.save().then(resolve, reject);
        } else {
          reject('chatroom not found: ' + chatroomId);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = new chatroomController();