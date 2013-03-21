//= require jquery/jquery
//= require jquery-mobile-events/jquery-mobile-events
//= require sound-manager-2/script/soundmanager2
//= require underscore/underscore
//= require backbone/backbone
//= require dpr/dpr.js
//= requireSelf
//= require config
//= requireTree setup
//= requireTree ../models
//= requireTree ../views/jst
//= requireTree views

(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var dpr = window.dpr;

  // Define global namespace
  var app = window.app = {
    monitor: false,

    domReady: function () {
      $('html').addClass('dpr-' + dpr());
      new app.MainView();
    },

    soundReady: function () {
      app.Sound.all.invoke('load');
      app.Sound.all.on('add', function (sound) { sound.load(); });
    },

    socketReady: function () {
      app.socket.on('users', function (data) { app.User.all.set(data); });
      app.socket.on('play', function (data) {
        _.delay(function () {
          if (!app.monitor) app.Sound.all.get(data).play();
        }, data.t - new Date());
      });
      app.socket.on('poll', function (data, cb) { cb({t: +new Date()}); });
      app.socket.emit('sounds', null, function (data) {
        app.Sound.all.set(data);
      });
    }
  };
})();
