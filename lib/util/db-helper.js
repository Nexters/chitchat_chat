"use strict";

var config = require('../../config/config');
var mongoose = require('mongoose');
var B = require('bluebird');

function connect() {
  let dbUri = config.db.uri + config.db.dbName;
  let dbOptions = {
    username: config.db.username,
    password: config.db.password
  };

  return B(mongoose.connect(dbUri, dbOptions));
};

function disconnect() {
  return B(mongoose.disconnect());
};

module.exports.connect = connect;

module.exports.disconnect = disconnect;