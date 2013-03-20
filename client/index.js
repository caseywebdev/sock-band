//= require jquery/jquery
//= require jquery-mobile-events/jquery-mobile-events
//= require socket-io/dist/socket.io
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
    ready: function () {
      $('html').addClass('dpr-' + dpr());
    },

    init: function () {
      app.Sound.all.fetch({
        success: function (sounds) { sounds.invoke('loadSound'); }
      });
    }
  };

  // Run on DOM ready, build intial view
  $(app.ready);
})();
