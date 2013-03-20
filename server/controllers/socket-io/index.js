var _ = require('underscore');
var User = require('../../../models/user');

var events = [
  'sounds',
  'play',
  'disconnect'
];

module.exports = function (app) {
  app.io.sockets.on('connection', function (client) {
    var user = new User({id: client.id, client: client});
    User.all.add(user);
    client.emit('users', User.all);
    client.broadcast.emit('users', User.all);
    _.each(events, function (event) {
      client.on(event, function () {
        var args = [].slice.apply(arguments);
        require('./' + event).apply(this, [user].concat(args));
      });
    });
  });
};
