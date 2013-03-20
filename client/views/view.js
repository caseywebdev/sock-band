(function () {
  'use strict';

  var app = window.app;

  var Backbone = window.Backbone;

  app.View = Backbone.View.extend({
    initialize: function () {
      this.views = {};
    }
  });
})();
