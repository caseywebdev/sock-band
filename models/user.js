//= require ./model

(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var Model = node ? require('./model') : app.Model;

  var User = Model.extend({});

  User.Collection = Model.Collection.extend({
    model: User,

    url: '/users'
  });

  node ? module.exports = User : app.User = User;
})();
