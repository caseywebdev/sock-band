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
        soundManager.createSound(this.nextTrack(), this.audioPath()).load();
      }, this);
    },

    nextTrack: function () {
      return this.id + '-' + (++this.track % this.tracks);
    },

    emit: function () {
      this.play();
      app.socket.emit('play', {id: this.id, t: +new Date()});
    },

    play: function () {
      if (this.loaded) {
        this.trigger('play');
        soundManager.play(this.nextTrack());
      }
    },

    key: function () {
      return String.fromCharCode(this.get('charCode'));
    }
  });

  Sound.Collection = Model.Collection.extend({
    model: Sound,

    url: '/sounds'
  });

  Sound.all = new Sound.Collection([{
      id: 'e-chord',
      charCode: 81,
      name: 'E'
    }, {
      id: 'f-chord',
      charCode: 87,
      name: 'F'
    }, {
      id: 'fs-chord',
      charCode: 69,
      name: 'F♯'
    }, {
      id: 'g-chord',
      charCode: 82,
      name: 'G'
    }, {
      id: 'gs-chord',
      charCode: 65,
      name: 'G♯'
    }, {
      id: 'a-chord',
      charCode: 83,
      name: 'A'
    }, {
      id: 'bb-chord',
      charCode: 68,
      name: 'B♭'
    }, {
      id: 'b-chord',
      charCode: 70,
      name: 'B'
    }, {
      id: 'c-chord',
      charCode: 90,
      name: 'C'
    }, {
      id: 'cs-chord',
      charCode: 88,
      name: 'C♯'
    }, {
      id: 'd-chord',
      charCode: 67,
      name: 'D'
    }, {
      id: 'eb-chord',
      charCode: 86,
      name: 'E♭'
    }, {
      id: 'hh-closed',
      charCode: 73,
      name: 'High-hat (Closed)'
    }, {
      id: 'hh-open',
      charCode: 79,
      name: 'High-hat (Open)'
    }, {
      id: 'crash',
      charCode: 80,
      name: 'Crash'
    }, {
      id: 'snare',
      charCode: 85,
      name: 'Snare'
    }, {
      id: 'kick',
      charCode: 89,
      name: 'Kick'
    }, {
      id: 'clap',
      charCode: 84,
      name: 'Clap'
    }, {
      id: 'tom',
      charCode: 75,
      name: 'Tom'
    }, {
      id: 'snap',
      charCode: 74,
      name: 'Snap'
    }
  ]);

  node ? module.exports = Sound : app.Sound = Sound;
})();
