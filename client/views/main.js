//= require ./view

(function () {
  'use strict';

  var $ = window.jQuery;
  var app = window.app;

  app.MainView = app.View.extend({
    el: '#main',

    initialize: function () {
      this.$el.append(new app.ListView({
        collection: app.Sound.all,
        modelView: app.SoundView
      }).render().el);
      $(document).on('keydown', function (ev) {
        var sound = app.Sound.all.findWhere({charCode: ev.which});
        if (sound) sound.emit();
      });
    },

    events: {
      'vclick .js-toggle-monitor': 'toggleMonitor'
    },

    toggleMonitor: function (ev) {
      var on = app.monitor = !app.monitor;
      $(ev.currentTarget).text('Monitor is ' + (on ? 'On' : 'Off'));
    }
  });
})();
