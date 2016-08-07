"use strict";

var protocols = require('./protocols/protocols');
var _ = require('lodash');

function handleConnect(socket) {
  _.mapValues(protocols, (protocolName, protocolFunction) => {
    socket.on(protocolName, protocolFunction.bind(this));
  });
};

module.exports = handleConnect;