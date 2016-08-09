'use strict';

var io = require('socket.io');

var configureSocketServer = require('./configure-socket-server');
var dbHelper = require('./util/db-helper');

function main() {
  let port = 5003;
  let ioOpts = {};

  let ioServer = io(port, ioOpts);

  dbHelper.connect().then(() => {
    configureSocketServer(ioServer);
  })
  .catch((e) => {
    console.log(e);
  });
}

main();

