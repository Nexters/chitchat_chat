"use strict";

var userModel = require('../model/user')
  , ObjectId = require('mongoose').Types.ObjectId
  , B = require('bluebird')
  ;

var userController = function () {};

userController.prototype.findUser = function (userId) {
  return new B((resolve, reject) => {
    userModel.findById(userId).exec()
      .then((user) => {
        if (null !== user) {
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