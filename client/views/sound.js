//= require ./view.js

(function () {
  'use strict';

  var app = window.app;

  var jst = window.jst;

  app.SoundView = app.View.extend({
    className: 'sound',
    template: jst['views/jst/sound'],

    render: function () {
      this.$el.html(this.template({sound: this.model}));
      this.listenTo(this.model, 'play', this.play);
      return this;
    },

    events: {
      'vmousedown': 'emit'
    },

    emit: function () { this.model.emit(); },

    play: function () {
      this.$el.removeClass('js-transition').addClass('js-playing').height();
      this.$el.addClass('js-transition').removeClass('js-playing');
    }
  });
})();
