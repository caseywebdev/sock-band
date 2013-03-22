(function () {
  'use strict';

  var app = window.app;
  var path = 'http://localhost:3333';
  var env = location.href.indexOf(path) === 0 ? 'development' : 'production';

  app.config = {
    env: env
  };
})();
