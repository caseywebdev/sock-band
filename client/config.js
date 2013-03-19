(function () {
  'use strict';

  var app = window.app;
  var path = 'http://localhost:3333';
  var env = !location.href.indexOf(path) ? 'production' : 'development';

  app.config = {
    env: env
  };
})();
