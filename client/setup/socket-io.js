(function () {
  'use strict';

  var app = window.app;
  var io = window.io;

  app.socket = io.connect(app.config.serverUrl);
  app.socket.on('connect', app.socketReady);
})();
