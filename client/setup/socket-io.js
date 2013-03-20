(function () {
  'use strict';

  var app = window.app;
  var io = window.io;

  app.socket = io.connect(app.config.serverUrl);
  app.socket.on('connect', app.socketReady);
  app.socket.on('users', function (data) { app.User.all.set(data); });
  app.socket.on('play', function (data) { app.Sound.all.get(data).play(); });
})();
