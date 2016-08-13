"use strict";

var openRoom = require('./open-room.js');
var joinRoom = require('./join-room.js');
var getMembers = require('./get-members.js');
var getTexts = require('./get-texts.js');
var sendText = require('./send-text.js');
var leaveRoom = require('./leave-room.js');
var closeRoom = require('./close-room.js');

var protocols = {
  openRoom,
  joinRoom,
  getMembers,
  getTexts,
  sendText,
  leaveRoom,
  closeRoom
}

module.exports = protocols; 