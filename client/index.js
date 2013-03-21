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
  var dpr = window.dpr;

  // Define global namespace
  var app = window.app = {
    lag: 0,
    lags: [],

    offset: 0,
    offsets: [],

    domReady: function () {
      $('html').addClass('dpr-' + dpr());
      var soundListView = new app.ListView({
        collection: app.Sound.all,
        modelView: app.SoundView
      });
      $('body').append(soundListView.el);
      $(document).on('keydown', function (ev) {
        var sound = app.Sound.all.at(ev.which - 65);
        if (sound) sound.emit();
      });
    },

    soundReady: function () {
      app.Sound.all.invoke('load');
      app.Sound.all.on('add', function (sound) { sound.load(); });
    },

    socketReady: function () {
      app.socket.emit('sounds', null, function (data) {
        app.Sound.all.set(data);
      });
    }
  };
})();
