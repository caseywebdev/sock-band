(function () {
  'use strict';

  var app = window.app;
  var soundManager = window.soundManager;

  soundManager.setup({
    url: '/swf',
    onready: app.soundReady,
    debugMode: false,
    useFlashBlock: false,
    useHighPerformance: true,
    flashVersion: 9
  });
})();
