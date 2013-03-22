(function () {
  'use strict';

  var $ = window.jQuery;
  var app = window.app;

  if (app.config.env === 'development') {
    $(function () {
      var host = (location.host || 'localhost').split(':')[0];
      var url = 'http://' + host + ':35729/livereload.js?snipver=1';
      $('body').append($('<script>').attr('src', url));
    });
  }
})();
