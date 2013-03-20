//= require ./model

(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var _ = node ? require('underscore') : window._;
  var Model = node ? require('./model') : app.Model;
  var soundManager = node ? null : window.soundManager;

  var Sound = Model.extend({
    tracks: 10,

    gfxPath: function () {
      return '/gfx/sounds/' + this.id + '.png';
    },

    audioPath: function () {
      return '/audio/sounds/' + this.id + '.mp3';
    },

    load: function () {
      if (this.loaded) return;
      this.loaded = true;
      this.track = -1;
      _.times(this.tracks, function () {
        soundManager.createSound(this.nextTrack(), this.audioPath());
      }, this);
    },

    nextTrack: function () {
      return this.id + '-' + (++this.track % this.tracks);
    },

    play: function () {
      if (this.loaded) soundManager.play(this.nextTrack());
    }
  });

  Sound.Collection = Model.Collection.extend({
    model: Sound,

    url: '/sounds'
  });

  Sound.all = new Sound.Collection();

  node ? module.exports = Sound : app.Sound = Sound;
})();
