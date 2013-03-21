var User = require('../../../models/user');
var config = require('../../config');

module.exports = function (user, data) {
  var t = data.t - user.get('offset');
  var buffer = config.buffer;
  User.all.each(function (_user) {
    if (_user === user) return;
    _user.get('client').volatile.emit('play', {
      id: data.id,
      t: t + _user.get('offset') + buffer
    });
  });
};
