//= require ./model.js

(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var Model = node ? require('./model') : app.Model;

  var User = Model.extend({
    toJSON: function () {
      return this.omit('client');
    }
  });

  User.Collection = Model.Collection.extend({
    model: User,

    url: '/users'
  });

  User.all = new User.Collection();

  node ? module.exports = User : app.User = User;
})();
