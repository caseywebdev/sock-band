(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var Backbone = node ? require('backbone') : window.Backbone;

  var Model = Backbone.Model.extend({});

  Model.Collection = Backbone.Collection.extend({
    model: Model
  });

  node ?  module.exports = Model : app.Model = Model;
})();
