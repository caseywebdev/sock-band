(function () {
  'use strict';

  var app = window.app;
  var io = window.io;

  app.socket = io.connect();
  app.socket.on('connect', app.socketReady);
})();
