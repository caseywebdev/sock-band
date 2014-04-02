//= require bower_components/jquery/dist/jquery.js
//= require bower_components/jquery-mobile-events/jquery-mobile-events.js
//= require bower_components/sound-manager-2/script/soundmanager2.js
//= require node_modules/underscore/underscore.js
//= require node_modules/backbone/backbone.js
//= require bower_components/dpr/dpr.js
//= requireSelf
//= require ./config
//= requireTree ./setup
//= requireTree ../models
//= requireTree ../views/jst
//= requireTree ./views

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
    },

    socketReady: function () {
      app.socket.on('users', function (data) { app.User.all.set(data); });
      app.socket.on('play', function (data) {
        _.delay(function () {
          if (!app.monitor) app.Sound.all.get(data).play();
        }, data.t - new Date());
      });
      app.socket.on('poll', function (data, cb) { cb({t: +new Date()}); });
    }
  };
})();
