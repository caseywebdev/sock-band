//= require ./view

(function () {
  'use strict';

  var app = window.app;
  var jst = window.jst;

  app.SoundView = app.View.extend({
    className: 'sound',
    template: jst['sound'],

    render: function () {
      this.$el.html(this.template({sound: this.model}));
      return this;
    },

    events: {
      'vmousedown': 'emit'
    },

    emit: function () { this.model.emit(); }
  });
})();
