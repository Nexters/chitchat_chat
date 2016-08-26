"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var ChatroomSchema = new Schema({
  participants: { type: [Schema.Types.ObjectId] },
  participant_counter: { type: Schema.Types.Number },
  targetGender: { type: String, required: true },
  targetDrama: { type: Schema.Types.ObjectId, required: true, ref: 'dramas' }
});

ChatroomSchema.index({ address: 1 });

mongoose.model('chatrooms', ChatroomSchema);

var chatroomModel = mongoose.model('chatrooms');
module.exports = chatroomModel;