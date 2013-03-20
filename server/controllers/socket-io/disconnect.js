var User = require('../../../models/user');

module.exports = function (user) {
  var client = user.get('client');
  user.unset('id').destroy();
  client.emit('users', User.all);
  client.broadcast.emit('users', User.all);
};
