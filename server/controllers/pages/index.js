module.exports = function (app) {
  app.get('*', require('./read'));
};
