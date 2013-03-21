(function () {
  'use strict';

  var _ = window._;
  var app = window.app;
  var io = window.io;

  app.socket = io.connect(app.config.serverUrl);
  app.socket.on('connect', app.socketReady);
  app.socket.on('users', function (data) { app.User.all.set(data); });
  app.socket.on('play', function (data) {
    var delay = data.t - new Date();
    console.log('ms to wait for play: ' + delay);
    _.delay(function () {
      app.Sound.all.get(data).play();
    }, delay);
  });
  app.socket.on('poll', function (data, cb) { cb({t: +new Date()}); });
})();
