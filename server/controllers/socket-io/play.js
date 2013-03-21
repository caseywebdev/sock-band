module.exports = function (user, data) {
  user.get('client').broadcast.volatile.emit('play', data);
};
