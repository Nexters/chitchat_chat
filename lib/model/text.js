"use strict";

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;

var textSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, required: true },
  cid: { type: Schema.Types.ObjectId, required: true },
  time: { type: Date, required: true, default: new Date().now() },
  message: { type: String, required: true },

});

mongoose.model('texts', textSchema);

var textModel = mongoose.model('texts');
module.exports = textModel;