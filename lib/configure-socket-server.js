"use strict";

var handleConnect = require('./handle-connect.js');

function configSocketServer(io) {
  io.sockets.on('connect', handleConnect);
};

module.exports = configSocketServer;