module.exports = function (user) {
  var start = +new Date();
  user.get('client').emit('poll', null, function (data) {
    var end = +new Date();
    var lag = (end - start) / 2;
    user.set({
      lag: lag,
      offset: data.t - start - lag
    });
  });
};
