var _ = require('underscore');
var User = require('../../../models/user');
User.all = new User.Collection();

var events = {
  'disconnect': 'disconnect'
};

module.exports = function (app) {
  app.io.sockets.on('connection', function (client) {
    var user = new User({client: client});
    User.all.add(user);
    _.each(events, function (file, event) {
      client.on(event, function () {
        require('./' + file).apply(this, [user].concat([].slice(arguments)));
      });
    });
  });
};
