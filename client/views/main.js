//= require ./view.js

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
      this.listenTo(app.User.all, 'add remove', this.updateUserCount);
    },

    events: {
      'vclick .js-toggle-monitor': 'toggleMonitor'
    },

    toggleMonitor: function () {
      var on = app.monitor = !app.monitor;
      this.$('.js-on-or-off').text(on ? 'On' : 'Off');
    },

    updateUserCount: function (user, users) {
      this.$('.js-user-count').text(users.length);
      this.$('.js-plural')[users.length === 1 ? 'hide' : 'show']();
    }
  });
})();
