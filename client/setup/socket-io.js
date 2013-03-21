(function () {
  'use strict';

  var _ = window._;
  var app = window.app;
  var io = window.io;

  app.socket = io.connect(app.config.serverUrl);
  app.socket.on('connect', app.socketReady);
  app.socket.on('users', function (data) { app.User.all.set(data); });
  app.socket.on('play', function (data) {
    var timeToPlay = data.t + app.offset + app.config.buffer;
    var delay = timeToPlay - new Date();
    console.log('Time to wait for play: ' + delay);
    _.delay(function () {
      app.Sound.all.get(data).play();
    }, delay);
  });
})();
