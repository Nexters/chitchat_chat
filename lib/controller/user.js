"use strict";

var userModel = require('../model/user')
  , ObjectId = require('mongoose').Types.ObjectId
  ;

var userController = function () {};

userController.prototype.findUser = function (userId) {
  return new B((resolve, reject) => {
    userModel.find({ _id: userId }).exec()
      .then((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('user not found: ' + userId);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = new userController();