"use strict";

var handleConnect = require('./handle-connect.js');

function configSocketServer(io) {
  io.sockets.on('connect', handleConnect.bind(null, io));
};

module.exports = configSocketServer;