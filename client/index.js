//= require jquery/jquery
//= require jquery-mobile-events/jquery-mobile-events
//= require underscore/underscore
//= require underscore.string/lib/underscore.string
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
    }
  };

  // Run on DOM ready, build intial view
  $(app.ready);
})();
