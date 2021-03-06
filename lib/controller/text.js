"use strict";

var textModel = require('../model/text')
  , ObjectId = require('mongoose').Types.ObjectId
  , B = require('bluebird')
  ;

var textController = function () { };

textController.prototype.saveText = function (uid, cid, msg) {
  return new B((resolve, reject) => {
    let newText = new textModel({
      uid: uid,
      cid: cid,
      time: new Date(),
      message: msg
    })
    newText.save()
      .then(resolve, reject)
      .catch((err) => {
        reject(err);
      });
  });
};

textController.prototype.getTexts = function (cid, start, end) {
  return new B((resolve, reject) => {
    textModel.find({ cid: cid })
      .skip(start)
      .limit(end - start + 1)
      .sort({ time: 1 })
      .populate({ path: 'uid', model: 'users' })
      .exec()
      .then((texts) => {
        if (texts) {
          resolve(texts);
        } else {
          reject('text not found: ' + textId);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = new textController();