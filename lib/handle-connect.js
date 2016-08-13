"use strict";

var protocols = require('./protocols/protocols');
var _ = require('lodash');

function handleConnect(io, socket) {
  _.mapValues(protocols, (protocolFunction, protocolName) => {
    socket.on(protocolName, protocolFunction.bind(socket, io));
  });
};

module.exports = handleConnect;