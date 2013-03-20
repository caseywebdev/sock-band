//= require ./model

(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var Model = node ? require('./model') : app.Model;
  var soundManager = node ? null : window.soundManager;

  var Sound = Model.extend({
    gfxPath: function () {
      return '/gfx/sounds/' + this.id + '.png';
    },

    audioPath: function () {
      return '/audio/sounds/' + this.id + '.mp3';
    },

    loadSound: function () {
      soundManager.createSound({id: this.id, url: this.audioPath()});
    },

    play: function () {
      soundManager.play(this.id);
    }
  });

  Sound.Collection = Model.Collection.extend({
    model: Sound,

    url: '/sounds'
  });

  Sound.all = new Sound.Collection();

  node ? module.exports = Sound : app.Sound = Sound;
})();
