module.exports = function (app) {
  app.get('/sounds', require('./read-all'));
};
