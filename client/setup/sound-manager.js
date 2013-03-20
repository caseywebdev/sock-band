(function () {
  'use strict';

  var app = window.app;
  var soundManager = window.soundManager;

  soundManager.setup({
    url: '/swf',
    onready: app.soundReady,
    debugMode: true,
    useHighPerformance: true,
    flashVersion: 9
  });
})();
