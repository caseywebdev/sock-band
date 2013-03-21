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

  var average = function (arr) {
    return _.reduce(arr, function (sum, n) { return sum + n; }, 0) / arr.length;
  };

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
      app.ping();
      setInterval(function () { app.ping(); }, app.config.pingInterval);
      app.socket.emit('sounds', null, function (data) {
        app.Sound.all.set(data);
      });
    },

    ping: function () {
      var start = +new Date();
      app.socket.emit('ping', null, function (data) {
        var end = +new Date();
        var lag = (end - start) / 2;
        var offset = start - data.t + lag;
        app.lags.push(lag);
        app.offsets.push(offset);
        app.lag = average(app.lags);
        app.offset = average(app.offsets);
      });
    }
  };
})();
