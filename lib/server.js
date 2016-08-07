'use strict';

var io = require('socket.io');

var configureSocketServer = require('./configure-socket-server');

function main() {
  let port = 5003;
  let ioServer = io(port, ioOpts);

  configureSocketServer(ioServer);
}

main();

