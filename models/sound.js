//= require ./model

(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var Model = node ? require('./model') : app.Model;

  var Sound = Model.extend({});

  Sound.Collection = Model.Collection.extend({
    model: Sound
  });

  node ? module.exports = Sound : app.Sound = Sound;
})();
