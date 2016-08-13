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

  let mconnect = B.promisify(mongoose.connect, {context: mongoose});

  return mconnect(dbUri, dbOptions);
};

function disconnect() {

  return B.promisify(mongoose.disconnect, {context: mongoose})();
};

module.exports.connect = connect;

module.exports.disconnect = disconnect;