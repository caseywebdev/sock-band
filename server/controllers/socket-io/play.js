module.exports = function (user, sound) {
  var client = user.get('client');
  //client.emit('play', sound);
  client.broadcast.emit('play', sound);
};
